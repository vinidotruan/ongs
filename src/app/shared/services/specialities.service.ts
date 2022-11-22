import { Injectable } from '@angular/core';
import { Ong } from '@models/ong';
import { ApiRequest } from '@models/requests/api-request';
import { ApiResponse } from '@models/responses/api-response';
import { Speciality } from '@models/speciality';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from './user';

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
  ): Observable<ApiResponse<Ong[]>> => {
    const request: ApiRequest = {
      path: `/specialities/${specialityId}/ongs`,
    };

    return this.apiService.get<Ong[]>(request);
  };

  public getSpecialitiesByOng = (
    ong: string
  ): Observable<ApiResponse<Speciality[]>> => {
    const request: ApiRequest = {
      path: `/ongs/${ong}/specialities`,
      deserializeAs: Speciality,
    };

    return <Observable<ApiResponse<Speciality[]>>>(
      this.apiService.get<Speciality[]>(request)
    );
  };

  public getAllSpecialists = (): Observable<ApiResponse<User[]>> => {
    const request: ApiRequest = {
      path: `/user/specialists`,
      deserializeAs: User,
    };

    return this.apiService.get<User[]>(request);
  };
}
