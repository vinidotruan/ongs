import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AvailableDate } from '@models/available-date';
import { NewAppointmentForm } from '@models/forms/new-appointment';
import { Ong } from '@models/ong';
import { Pet } from '@models/pet';
import { Speciality } from '@models/speciality';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertSuccessComponent } from '@shared/components/modals/alert-success/alert-success.component';
import { allMonthsObject } from '@shared/helpers/calendar-helper';
import { AuthService } from '@shared/services/auth.service';
import { PetsService } from '@shared/services/pets.service';
import { SchedulesService } from '@shared/services/schedules.service';
import { SpecialitiesService } from '@shared/services/specialities.service';
import { UserSpeciality } from '@shared/services/user';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
})
export class AppointmentCreateComponent implements OnInit {
  public form: FormGroup;
  public maxDistance = 0;
  public specialities: Speciality[];
  public ongs: Ong[] = [];
  public pets: Pet[] = [];
  public availablesDates: AvailableDate[] = [];
  public availablesDaysOfDate = JSON.parse(JSON.stringify(allMonthsObject));
  public selectedHour: string;

  constructor(
    private specialitiesService: SpecialitiesService,
    private authService: AuthService,
    private scheduleService: SchedulesService,
    private petsService: PetsService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.form = new NewAppointmentForm().form();
    this.form.patchValue({ type_scheduling_id: 1, description: '' });
  }

  ngOnInit(): void {
    this.listenChangeSlider();
    this.getSpecialities();
    this.getPets();
  }

  public specialitySelected = (speciality: string) => {
    this.form.patchValue({ speciality_id: speciality });
    this.getOngsBySpeciality(speciality);
  };

  public ongSelected = (ong: string) => {
    this.form.patchValue({ ong_id: ong });
    this.getPets();
    this.getSchedulesAvailables();
  };

  public listenChangeSlider = () => {
    this.form.get('max_distance')?.valueChanges.subscribe({
      next: (value) => (this.maxDistance = value),
      error: (error) => {
        console.error(error);
      },
    });
  };

  public selectHour = (hour: string) => {
    this.selectedHour = hour;
    this.setAvailableDays(hour);
  };

  public isActualMaxDistance = (actualDistance: number): boolean =>
    this.maxDistance == actualDistance;

  public dateClicked = (event: any) => {
    let { year, month, day } = event;
    day = String(day).length < 2 ? `0${day}` : day;

    const eventDate = `${year}-${month}-${day}`;
    const eventHour = this.selectedHour;

    const selectedDate = this.availablesDates.find(
      (date) => date.date == eventDate && date.start_time == eventHour
    );

    this.form.patchValue({ schedule_id: selectedDate.id });
  };

  public getHoursOfAvailableDates = (): string[] => [
    ...new Set(this.availablesDates.map((date) => date.start_time)),
  ];

  public setAvailableDays = (hour: string) => {
    this.availablesDaysOfDate = JSON.parse(JSON.stringify(allMonthsObject));

    this.availablesDates
      .filter((date) => date.start_time === hour)
      .map((date) => this.availablesDaysOfDate[date.month()].push(date.day()));
  };

  public submit = (): void => {
    this.form.patchValue({ type_scheduling_id: 1, description: 'dasdasd' });
    this.scheduleService.makeScheduling(this.form.getRawValue()).subscribe({
      next: () => {
        this.modalService
          .open(AlertSuccessComponent, { backdrop: false })
          .closed.subscribe({
            next: () => this.router.navigate(['/home']),
            error: (error) => console.log(error),
          });
      },
      error: (error) => alert(error),
    });
  };

  private getSpecialities = (): void => {
    this.specialitiesService.getAll().subscribe({
      next: ({ data }) => (this.specialities = data as Speciality[]),
      error: (error) => alert(error),
    });
  };

  private getOngsBySpeciality = (speciality: string): void => {
    this.specialitiesService.getOngsBySpeciality(speciality).subscribe({
      next: ({ data }) => (this.ongs = data as Ong[]),
      error: (error) => alert(error),
    });
  };

  private getPets = (): void => {
    this.petsService.getPetsByUser(this.authService.currentUser.id).subscribe({
      next: ({ data }: { data: Pet[] }) => (this.pets = data),
      error: (error) => alert(error),
    });
  };

  private getSchedulesAvailables = (): void => {
    this.scheduleService
      .getAvailables(this.form.get('ong_id').getRawValue())
      .subscribe({
        next: ({ data }: { data: UserSpeciality[] }) => {
          data.map((u) => this.availablesDates.push(...u.schedules));
          console.log(this.availablesDates);
        },
        error: (error) => alert(error.message),
      });
  };
}
