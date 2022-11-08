import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AvailableDate } from '@models/available-date';
import { NewAppointmentForm } from '@models/forms/new-appointment';
import { Ong } from '@models/ong';
import { Pet } from '@models/pet';
import { Speciality } from '@models/speciality';
import { allMonthsObject } from '@shared/helpers/calendar-helper';
import { AuthService } from '@shared/services/auth.service';
import { SchedulesService } from '@shared/services/schedules.service';
import { SpecialitiesService } from '@shared/services/specialities.service';

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
  public availablesDates: AvailableDate[];
  public availablesDaysOfDate = allMonthsObject;
  public selectedHour: string;

  constructor(
    private specialitiesService: SpecialitiesService,
    private authService: AuthService,
    private scheduleService: SchedulesService
  ) {
    this.form = new NewAppointmentForm().form();
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
    console.log(event);
  };

  public getHoursOfAvailableDates = (): string[] =>
    this.availablesDates.map((date) => date.start_time);

  public setAvailableDays = (hour: string) => {
    this.availablesDates
      .filter((date) => date.start_time === hour)
      .map((date) => this.availablesDaysOfDate[date.month()].push(date.day()));
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

  private getPets = (): Pet[] =>
    (this.pets = this.authService.currentUser?.pets);

  private getSchedulesAvailables = (): void => {
    this.scheduleService
      .getAvailables(this.form.get('ong_id').getRawValue())
      .subscribe({
        next: ({ data }: { data: AvailableDate[] }) => {
          this.availablesDates = data;
        },
        error: (error) => alert(error.message),
      });
  };
}
