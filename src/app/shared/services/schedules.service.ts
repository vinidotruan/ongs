import { Injectable } from '@angular/core';
import { AvailableDate } from '@models/available-date';
import { ApiResponse } from '@models/responses/api-response';
import { IndexResponse } from '@models/responses/index-response';
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
}
