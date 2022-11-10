import { Injectable } from '@angular/core';
import { AvailableDate } from '@models/available-date';
import { ApiResponse } from '@models/responses/api-response';
import { Scheduling } from '@models/scheduling';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private apiService: ApiService) {}

  public getAvailables = (
    ongId: string
  ): Observable<ApiResponse<AvailableDate[]>> => {
    const request = {
      path: '/schedules',
      params: { ong_id: ongId },
      deserializeAs: AvailableDate,
    };

    return this.apiService.get<AvailableDate[]>(request);
  };

  public makeScheduling = (scheduling: Scheduling) => {
    const request = {
      path: '/schedulings',
      body: scheduling,
    };

    return this.apiService.post<Scheduling>(request);
  };
}
