import { Component, OnInit } from '@angular/core';
import { OngService } from '@shared/services/ong.service';
import { UserSpeciality } from '@shared/services/user';
import { AvailableDate } from '@models/available-date';
import { allMonthsObject } from '@shared/helpers/calendar-helper';
import { Ong } from '@models/ong';
import { ApiResponse } from '@models/responses/api-response';
import { map } from 'rxjs';
import { groupBy } from '@shared/helpers/utils';

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
  public todayDate = new Date();
  public sevenDaysDate = (date: Date): Date => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    return newDate;
  };

  public specialistsToFilter: any;
  public specialistiesToFilter: any;
  public specialistsFiltered: any = [];

  public nextSchedules: UserSpeciality[][];

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
          this.getNextSchedules(response.id);
        }
      },
      error: (error) => console.log(error),
    });
  }

  public filterSpecialistsByDate = (event: any): void => {
    const date = new Date(`${event.year}-${event.month}-${event.day}`);

    const specialistsFiltered = this.specialists
      .map(({ schedules, ...others }) => {
        const filteredSchedules = schedules.filter(
          (availableDate: AvailableDate) =>
            new Date(availableDate.date).getTime() === date.getTime()
        );
        return {
          ...others,
          schedules: filteredSchedules,
        };
      })
      .filter((product) => product.schedules.length > 0);

    this.specialistsFiltered = [...specialistsFiltered];
  };

  public hasSomeFilter = (): boolean =>
    Object.values(this.filters).some((filter: []) => filter.length);

  public hasSomeDate = () =>
    Object.values(this.availableDays).some((months: []) => months.length);

  public specialistHasSchedule = (specialists: UserSpeciality[]): boolean =>
    specialists.some((specialist) => specialist.hasSomeSchedule());

  public filterCalendarBy = (label: string, id: string, { target }) => {
    const { checked } = target;
    const key = dict[label];

    this.resetFilteredAvailableDaysList();

    if (!checked) {
      const index = this.filters[label].indexOf(id);
      this.filters[label].splice(index, 1);

      if (!this.hasSomeFilter()) {
        this.clearFilters();
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

  public clearFilters = () => {
    this.filteredAvailableDays = JSON.parse(JSON.stringify(this.availableDays));

    this.specialistsToFilter.map((specialist) => (specialist.checked = false));
    this.specialistiesToFilter.map(
      (speciality) => (speciality.checked = false)
    );

    this.filters = {
      specialists: [],
      specialities: [],
    };
  };

  private getSpecialists = (ong: string) => {
    this.ongService.getSpecialists(ong).subscribe({
      next: ({ data }: { data: UserSpeciality[] }) => {
        this.specialists = data;
        this.getAvailablesDatesByUser(data, this.availableDays);

        this.specialistsToFilter = this.getUniqueSpecialistsList(data);
        this.specialistiesToFilter = this.getUniqueSpecialitiesList(data);
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
      checked: null,
    }));

    return [...new Map(specialistsArr.map((item) => [item.id, item])).values()];
  };

  private getUniqueSpecialitiesList = (specialists: UserSpeciality[]): any => {
    const specialitiesArr = specialists.map((specialist) => ({
      name: specialist.speciality.name,
      id: specialist.speciality_id,
      checked: false,
    }));

    return [
      ...new Map(specialitiesArr.map((item) => [item.id, item])).values(),
    ];
  };

  private getNextSchedules = (ong) => {
    this.ongService
      .getNextSchedules(ong)
      .pipe(
        map((response: ApiResponse<UserSpeciality[][]>) => {
          const { data } = response;

          return Object.values(data).map((specialists) =>
            specialists.map((specialist) =>
              new UserSpeciality().deserialize(specialist)
            )
          );
        })
      )
      .subscribe({
        next: (response: UserSpeciality[][]) => {
          this.nextSchedules = response;
        },
      });
  };
}
