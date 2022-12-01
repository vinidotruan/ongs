import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { CreateScheduleForm } from '@models/forms/create-schedule';
import { Speciality } from '@models/speciality';
import { allWeekDaysArray } from '@shared/helpers/calendar-helper';
import { OngService } from '@shared/services/ong.service';
import { SchedulesService } from '@shared/services/schedules.service';
import { SpecialitiesService } from '@shared/services/specialities.service';
import { User, UserSpeciality } from '@shared/services/user';

@Component({
  selector: 'app-schedules-management',
  templateUrl: './schedules-management.component.html',
  styleUrls: ['./schedules-management.component.scss'],
})
export class SchedulesManagementComponent implements OnInit {
  public weekDays = allWeekDaysArray;
  public form = new CreateScheduleForm().form();
  public specialists: UserSpeciality[];
  public specialistsSchedules: UserSpeciality[][];
  public filteredSpecialists: UserSpeciality[];
  public specialities: Speciality[] = [];
  public schedules: any[];

  constructor(
    private ongService: OngService,
    private scheduleService: SchedulesService
  ) {
    this.ongService.currentOng.subscribe({
      next: (ong) => {
        if (ong.id) {
          this.getSpecialists(ong.id);
          this.getSchedules(ong.id);
        }
      },
      error: (error) => console.log(error),
    });

    this.listenSpecialityChange();
  }

  ngOnInit(): void {}

  public checkAll = () => {
    const weekDays = this.form.get('week_days') as FormArray;

    weekDays.value.forEach((element, index) => {
      weekDays.at(index).patchValue(!element);
    });
  };

  public selectSpecialist = (specialist: number) => {
    const formArray = <FormArray>this.form.get('specialists_ids');
    const specialist_id = this.specialists.find((s) => s.id === specialist)?.id;
    formArray.push(specialist_id);
  };

  public createSchedule = () => {
    this.scheduleService.storeSchedule(this.form.value).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  };

  private getSpecialities = (specialists: UserSpeciality[]) => {
    const specialities = [];

    specialists.map(({ speciality }) => specialities.push(speciality));

    specialities.forEach((speciality) => {
      if (!this.specialities.find((s) => s.id === speciality.id)) {
        this.specialities.push(speciality);
      }
    });
  };

  private getSpecialists = (ong: string) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[] }) => {
        this.specialists = data;
        this.getSpecialities(data);
      },
      error: (error) => console.log(error),
    });
  };

  private getSchedules = (ong: string) => {
    this.ongService.getSchedules(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[][] }) => {
        this.specialistsSchedules = Object.values(data).map((specialists) =>
          specialists.map((specialist) => {
            return new UserSpeciality().deserialize(specialist);
          })
        );
      },
      error: (error) => console.log(error),
    });
  };

  private filterSpecialists = (specialityId: string) => {
    this.filteredSpecialists = this.specialists.filter(
      (specialist) => specialist.speciality_id == specialityId
    );
  };

  private listenSpecialityChange = () => {
    this.form.get('speciality_id').valueChanges.subscribe({
      next: (response) => this.filterSpecialists(response),
      error: (error) => console.log(error),
    });
  };
}
