import { Component, OnInit } from '@angular/core';
import { OngService } from '@shared/services/ong.service';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/user';
import { AvailableDate } from '@models/available-date';
import { allMonthsObject } from '@shared/helpers/calendar-helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public specialists: User[];
  public availableDays = JSON.parse(JSON.stringify(allMonthsObject));
  constructor(
    private ongService: OngService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const ong = this.authService.currentUser['ongs'][0]?.id;
    this.getSpecialists(ong);
  }

  click = () => console.log('click');

  private getSpecialists = (ong: string) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: User[] }) => {
        this.specialists = data;
        this.getAvailablesDatesByUser();
      },
      error: (error) => console.log(error),
    });
  };

  private getAvailablesDatesByUser = () => {
    this.specialists.map(({ schedules }) => this.getAvailableDates(schedules));
  };

  private getAvailableDates = (dates: AvailableDate[]) => {
    dates
      .filter((date) => date.available)
      .map((date) => this.availableDays[date.month()].push(date.day()));

    this.availableDays = this.getUniqueArrayOfDates(this.availableDays);
    return this.availableDays;
  };

  private getUniqueArrayOfDates = (dates: AvailableDate[]) => {
    for (const [key, value] of Object.entries(this.availableDays)) {
      dates[key] = [...new Set(dates[key])];
    }
    return dates;
  };
}
