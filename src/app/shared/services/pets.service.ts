import { Injectable } from '@angular/core';
import { Breed } from '@models/breed';
import { Pet } from '@models/pet';
import { ApiResponse } from '@models/responses/api-response';
import { IndexResponse } from '@models/responses/index-response';
import { ShowResponse } from '@models/responses/show-response';
import { Size } from '@models/size';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private apiService: ApiService) {}

  public getPetsByUser = (userId: string): Observable<ApiResponse<Pet[]>> => {
    const request = {
      path: `/user/${userId}/pets`,
      deserializeAs: Pet,
    };

    return this.apiService.get<Pet[]>(request);
  };

  public getPet = (petId: string): Observable<ShowResponse<Pet>> => {
    const request = {
      path: `/pets/${petId}`,
      deserializeAs: Pet,
    };

    return this.apiService.show(request);
  };

  public getAllBreeds = (): Observable<IndexResponse<Breed>> => {
    const request = {
      path: `/breeds`,
      deserializeAs: Breed,
    };

    return this.apiService.index<Breed>(request);
  };

  public getAllBreedsSizes = (): Observable<IndexResponse<Size>> => {
    const request = {
      path: `/sizes`,
      deserializeAs: Size,
    };

    return this.apiService.index<Size>(request);
  };
}
