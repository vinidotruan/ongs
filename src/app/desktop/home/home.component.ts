import { Component, OnInit } from '@angular/core';
import { OngService } from '@shared/services/ong.service';
import { UserSpeciality } from '@shared/services/user';
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
  public filterSpecialistList: any;
  public availableDays = JSON.parse(JSON.stringify(allMonthsObject));
  public ong: Ong;

  constructor(private ongService: OngService) {}

  ngOnInit(): void {
    this.ongService.currentOng.subscribe({
      next: (response: Ong) => {
        if (response.id) {
          this.ong = response;
          this.getSpecialists(response.id);
        }
      },
      error: (error) => console.log(error),
    });
  }

  click = () => console.log('click');

  public hasSomeDate = () =>
    Object.values(this.availableDays).some((months: []) => months.length);

  private getSpecialists = (ong: string) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[] }) => {
        this.specialists = data;
        this.getAvailablesDatesByUser(data);
        this.filterSpecialistList = this.getUniqueSpecialistsList(data);
        console.log(this.filterSpecialistList);
      },
      error: (error) => console.log(error),
    });
  };

  private getAvailablesDatesByUser = (specialists: UserSpeciality[]) =>
    specialists.map(({ schedules }) => this.getAvailableDates(schedules));

  private getAvailableDates = (dates: AvailableDate[]) => {
    dates
      .filter((date) => date.available)
      .map((date) => this.availableDays[date.month()].push(date.day()));

    this.availableDays = this.getUniqueArrayOfDates(this.availableDays);

    return this.availableDays;
  };

  private getUniqueArrayOfDates = (dates: AvailableDate[]): AvailableDate[] => {
    for (const [key] of Object.entries(this.availableDays)) {
      dates[key] = [...new Set(dates[key])];
    }
    return dates;
  };

  private getUniqueSpecialistsList = (specialists: UserSpeciality[]): any => {
    const specialistsArr = specialists.map((specialist) => ({
      name: specialist.user.name,
      id: specialist.user_id,
    }));

    return [...new Map(specialistsArr.map((item) => [item.id, item])).values()];
  };
}
