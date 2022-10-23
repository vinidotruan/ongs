import { Injectable } from '@angular/core';
import { ApiRequest } from '@models/requests/api-request';
import { ApiResponse } from '@models/responses/api-response';
import { Speciality } from '@models/speciality';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SpecialitiesService {
  constructor(private apiService: ApiService) {}

  public getAll = () => {
    const request: ApiRequest = {
      path: '/specialities',
    };

    return this.apiService.get<any>(request);
  };

  public getOngsBySpeciality = (
    specialityId: string
  ): Observable<ApiResponse<Speciality[]>> => {
    const request: ApiRequest = {
      path: `/specialities/${specialityId}/ongs`,
    };

    return this.apiService.get<Speciality[]>(request);
  };

}
