import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { CreateScheduleForm } from '@models/forms/create-schedule';
import { allWeekDaysArray } from '@shared/helpers/calendar-helper';
import { AuthService } from '@shared/services/auth.service';
import { OngService } from '@shared/services/ong.service';
import { SpecialitiesService } from '@shared/services/specialities.service';
import { User } from '@shared/services/user';

@Component({
  selector: 'app-schedules-management',
  templateUrl: './schedules-management.component.html',
  styleUrls: ['./schedules-management.component.scss'],
})
export class SchedulesManagementComponent implements OnInit {
  public weekDays = allWeekDaysArray;
  public form = new CreateScheduleForm().form();
  public specialists: User[];

  constructor(
    private ongService: OngService,
    private authService: AuthService,
    private specialitiesService: SpecialitiesService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser;
    this.getSpecialists(currentUser.ongs[0]['id']);
  }

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

  public createSchedules = () => {};

  private getSpecialists = (ong) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: User[] }) => (this.specialists = data),
      error: (error) => console.log(error),
    });
  };
}
