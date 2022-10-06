import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '@models/requests/api-request';
import { ApiResponse } from '@models/responses/api-response';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  public signupApi(user: any): Observable<ApiResponse<any>> {
    const request: PostRequest = {
      path: '/auth/register',
      body: user,
    };

    return this.apiService.post<any>(request);
  }

  public login = (data: any) => {
    const request: PostRequest = {
      path: '/auth/request',
      body: data,
    };

    return this.apiService.post<any>(request);
  };
}
