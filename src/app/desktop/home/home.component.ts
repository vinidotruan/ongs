import { Component, OnInit } from '@angular/core';
import { OngService } from '@shared/services/ong.service';
import { AuthService } from '@shared/services/auth.service';
import { User, UserSpeciality } from '@shared/services/user';
import { AvailableDate } from '@models/available-date';
import { allMonthsObject } from '@shared/helpers/calendar-helper';
import { Ong } from '@models/ong';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public specialists: UserSpeciality[];
  public availableDays = JSON.parse(JSON.stringify(allMonthsObject));
  public ong: Ong;
  constructor(
    private ongService: OngService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ongService.currentOng.subscribe({
      next: (response: Ong) => {
        if (response) {
          this.ong = response;
          this.getSpecialists(response.id);
        }
      },
      error: (error) => {},
    });
  }

  click = () => console.log('click');

  private getSpecialists = (ong: string) => {
    console.log(ong);
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[] }) => {
        this.specialists = data;
        this.getAvailablesDatesByUser();
      },
      error: (error) => console.log(error),
    });
  };

  private getAvailablesDatesByUser = () => {
    return [];
    // this.specialists.map(({ schedules }) => this.getAvailableDates(schedules));
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
