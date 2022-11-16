import { Injectable } from '@angular/core';
import { ApiResponse } from '@models/responses/api-response';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class OngService {
  constructor(private apiService: ApiService) {}

  getSpecialists = (ong): Observable<ApiResponse<User[]>> => {
    const request = {
      path: `/ongs/${ong}/specialists`,
      deserializeAs: User,
    };

    return this.apiService.get<User[]>(request);
  };
}
