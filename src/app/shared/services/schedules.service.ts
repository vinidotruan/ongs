import { Injectable } from '@angular/core';
import { AvailableDate } from '@models/available-date';
import { ApiResponse } from '@models/responses/api-response';
import { Scheduling } from '@models/scheduling';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserSpeciality } from './user';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private apiService: ApiService) {}

  public getAvailables = (
    ongId: string
  ): Observable<ApiResponse<UserSpeciality[]>> => {
    const request = {
      path: '/schedules',
      params: { ong_id: ongId },
      deserializeAs: UserSpeciality,
    };

    return this.apiService.get<UserSpeciality[]>(request);
  };

  public makeScheduling = (scheduling: Scheduling) => {
    const request = {
      path: '/schedulings',
      body: scheduling,
      deserializeAs: Scheduling,
    };

    return this.apiService.post<Scheduling>(request);
  };

  public getNextScheduling = () => {
    const request = {
      path: '/schedulings/next-schedulings',
      deserializeAs: Scheduling,
    };

    return this.apiService.get(request);
  };

  public storeSchedule = (schedule) => {
    const request = {
      path: `/schedules`,
      body: schedule,
    };

    return this.apiService.post(request);
  };
}
