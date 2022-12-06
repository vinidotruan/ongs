import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '@models/requests/api-request';
import { ApiResponse } from '@models/responses/api-response';
import { ApiService } from './api.service';
import { User } from './user';
import { LoginResponse } from './login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: User;

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
      path: '/auth/login',
      body: data,
      deserializeAs: LoginResponse,
    };

    return this.apiService.post<any>(request);
  };

  public isLogged = () => localStorage.getItem('access_token');

  public setToken = (token: string): void =>
    localStorage.setItem('access_token', token);

  public logout = () => {
    const request = {
      path: `/auth/logout`,
      body: {},
    };

    return this.apiService.post(request);
  };

  public clearLocalStorage = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
  };

  public setCurrentUser = (user: User) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser = user;
  };

  public getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      return null;
    }

    this.currentUser = new User().deserialize(currentUser);
    return this.currentUser;
  }
}
