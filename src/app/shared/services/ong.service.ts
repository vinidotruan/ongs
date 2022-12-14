import { Injectable } from '@angular/core';
import { Ong } from '@models/ong';
import { ApiResponse } from '@models/responses/api-response';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ApiService } from './api.service';
import { User, UserSpeciality } from './user';

@Injectable({
  providedIn: 'root',
})
export class OngService {
  ongSubject = new BehaviorSubject<Ong>(new Ong());
  public currentOng: Observable<Ong> = this.ongSubject.asObservable();

  constructor(private apiService: ApiService) {}

  public setOng = (ong: Ong) => {
    this.ongSubject.next(new Ong().deserialize(ong));
  };

  public ong = () => {
    return this.ongSubject.value;
  };

  getSpecialists = (ong): Observable<ApiResponse<UserSpeciality[]>> => {
    const request = {
      path: `/ongs/${ong}/specialists`,
      deserializeAs: UserSpeciality,
    };

    return this.apiService.get<UserSpeciality[]>(request);
  };

  public attachSpecialist = (
    ong: string,
    specialist: User
  ): Observable<ApiResponse<any>> => {
    const request = {
      path: `/ongs/${ong}/specialists/${specialist.id}`,
      body: {},
    };

    return this.apiService.post(request);
  };

  public dettachSpecialist = (
    ong: string,
    specialist: User
  ): Observable<ApiResponse<any>> => {
    const request = {
      path: `/ongs/${ong}/specialists/${specialist.id}`,
    };

    return this.apiService.delete(request);
  };

  public getOng = (ong: string): Observable<ApiResponse<Ong>> => {
    const request = {
      path: `/ongs/${ong}`,
      deserializeAs: Ong,
    };

    return this.apiService.show<Ong>(request);
  };

  public getSchedules = (
    ong: string
  ): Observable<ApiResponse<UserSpeciality[]>> => {
    const request = {
      path: `/ongs/${ong}/schedules`,
    };

    return this.apiService.get(request);
  };

  public getNextSchedules = (
    ong: string
  ): Observable<ApiResponse<UserSpeciality[][]>> => {
    const request = {
      path: `/ongs/${ong}/specialists-next-schedules`,
    };

    return this.apiService.get<UserSpeciality[][]>(request);
  };

  public getStates = (): Observable<ApiResponse<any>> => {
    const request = {
      path: `/states`,
    };

    return this.apiService.get(request);
  };

  public getCities = (state: string): Observable<ApiResponse<any>> => {
    const request = {
      path: `/states/${state}`,
    };

    return this.apiService.get(request);
  };
}
