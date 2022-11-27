import { Component, OnInit } from '@angular/core';
import { OngService } from '@shared/services/ong.service';
import { UserSpeciality } from '@shared/services/user';
import { AvailableDate } from '@models/available-date';
import { allMonthsObject } from '@shared/helpers/calendar-helper';
import { Ong } from '@models/ong';
import { FormGroup, FormArray } from '@angular/forms';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

const dict = {
  specialists: 'user_id',
  specialities: 'speciality_id',
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public specialists: UserSpeciality[];
  public availableDays = JSON.parse(JSON.stringify(allMonthsObject));
  public filteredAvailableDays = JSON.parse(JSON.stringify(allMonthsObject));
  public ong: Ong;

  public filterSpecialistList: any;
  public filterSpecialitieList: any;

  private filters = {
    specialists: [],
    specialities: [],
  };

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
    const key = dict[label];
    this.resetFilteredAvailableDaysList();

    if (!checked) {
      const index = this.filters[label].indexOf(id);
      this.filters[label].splice(index, 1);

      if (!this.hasSomeFilter()) {
        this.filteredAvailableDays = JSON.parse(
          JSON.stringify(this.availableDays)
        );
      }
    } else {
      this.filters[label].push(id);

      this.specialists
        .filter((specialist) => this.filters[label].includes(specialist[key]))
        .map(({ schedules }) => {
          const dates = this.getAvailableDates(
            schedules,
            this.filteredAvailableDays
          );

          this.getUniqueArrayOfDates(dates, this.filteredAvailableDays);
        });
    }
  };
  private hasSomeFilter = (): boolean =>
    Object.values(this.filters).some((filter: []) => filter.length);

  private getSpecialists = (ong: string) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[] }) => {
        this.specialists = data;
        this.getAvailablesDatesByUser(data, this.availableDays);

        this.filterSpecialistList = this.getUniqueSpecialistsList(data);
        this.filterSpecialitieList = this.getUniqueSpecialitiesList(data);
      },
      error: (error) => console.log(error),
    });
  };

  private getAvailablesDatesByUser = (
    specialists: UserSpeciality[],
    arrOfDates
  ) =>
    specialists.map(({ schedules }) => {
      const dates = this.getAvailableDates(schedules, arrOfDates);
      const uniqueDates = this.getUniqueArrayOfDates(dates, arrOfDates);

      this.setAvailableDays(uniqueDates);
      this.setFilteredAvailableDaysList(uniqueDates);
    });

  private getAvailableDates = (dates: AvailableDate[], arr) => {
    dates
      .filter((date) => date.available)
      .map((date) => arr[date.month()].push(date.day()));

    return arr;
  };

  private getUniqueArrayOfDates = (
    dates: AvailableDate[],
    arrOfDates
  ): AvailableDate[] => {
    for (const [key] of Object.entries(arrOfDates)) {
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

  private resetFilteredAvailableDaysList = (): void => {
    this.filteredAvailableDays = JSON.parse(JSON.stringify(allMonthsObject));
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
