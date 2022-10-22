import { Injectable } from '@angular/core';
import { Pet } from '@models/pet';
import { ApiResponse } from '@models/responses/api-response';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private apiService: ApiService) {}

  public getPetsByUser = (): Observable<ApiResponse<Pet[]>> => {
    const request = {
      path: `/pets`,
    };

    return this.apiService.get<Pet[]>(request);
  };
}
