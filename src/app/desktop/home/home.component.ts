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
  public filterSpecialitieList: any;
  public defaultDays = JSON.parse(JSON.stringify(allMonthsObject));
  public availableDays = JSON.parse(JSON.stringify(allMonthsObject));
  public filteredAvailableDays = JSON.parse(JSON.stringify(allMonthsObject));
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

  public filterCalendarBy = (label: string, id: string, { target }) => {
    const { checked } = target;

    const dict = {
      specialist: 'user_id',
      speciality: 'speciality_id',
    };

    label = dict[label];

    this.specialists
      .filter((specialist) => specialist[label] == id)
      .map(({ schedules }) => {
        console.log(this.defaultDays);
        // const dates = this.getAvailableDates(schedules);
        // const uniqueDates = this.getUniqueArrayOfDates(dates);
        // console.log(uniqueDates);
        // this.setFilteredAvailableDaysList(uniqueDates);
      });

    // checked
    //   ? this.specialists
    //       .filter((specialist) => specialist[label] == id)
    //       .map(({ schedules }) => this.getAvailableDates(schedules))
    //   : this.resetFilteredAvailableDaysList(this.availableDays);
  };

  private getSpecialists = (ong: string) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[] }) => {
        this.specialists = data;
        this.getAvailablesDatesByUser(data);

        this.filterSpecialistList = this.getUniqueSpecialistsList(data);
        this.filterSpecialitieList = this.getUniqueSpecialitiesList(data);
      },
      error: (error) => console.log(error),
    });
  };

  private getAvailablesDatesByUser = (specialists: UserSpeciality[]) =>
    specialists.map(({ schedules }) => {
      const dates = this.getAvailableDates(schedules, this.defaultDays);
      const uniqueDates = this.getUniqueArrayOfDates(dates);

      this.setAvailableDays(uniqueDates);
      this.setFilteredAvailableDaysList(uniqueDates);
    });

  private getAvailableDates = (dates: AvailableDate[], arr) => {
    dates
      .filter((date) => date.available)
      .map((date) => arr[date.month()].push(date.day()));

    return arr;
  };

  private getUniqueArrayOfDates = (dates: AvailableDate[]): AvailableDate[] => {
    for (const [key] of Object.entries(this.availableDays)) {
      dates[key] = [...new Set(dates[key])];
    }
    return dates;
  };

  private setAvailableDays = (availabledDaysList: AvailableDate[]): void => {
    this.availableDays = availabledDaysList;
  };

  private setFilteredAvailableDaysList = (
    availabledDaysList: AvailableDate[]
  ): void => {
    this.filteredAvailableDays = availabledDaysList;
  };

  private resetFilteredAvailableDaysList = (
    availabledDaysList: AvailableDate[]
  ): void => {
    this.filteredAvailableDays = JSON.parse(JSON.stringify(this.availableDays));
  };

  private getUniqueSpecialistsList = (specialists: UserSpeciality[]): any => {
    const specialistsArr = specialists.map((specialist) => ({
      name: specialist.user.name,
      id: specialist.user_id,
    }));

    return [...new Map(specialistsArr.map((item) => [item.id, item])).values()];
  };

  private getUniqueSpecialitiesList = (specialists: UserSpeciality[]): any => {
    const specialitiesArr = specialists.map((specialist) => ({
      name: specialist.speciality.name,
      id: specialist.speciality_id,
    }));

    return [
      ...new Map(specialitiesArr.map((item) => [item.id, item])).values(),
    ];
  };
}
