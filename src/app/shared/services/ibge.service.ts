import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlIBGE = 'https://servicodados.ibge.gov.br/api/v1/localidades';

@Injectable({
  providedIn: 'root',
})
export class IbgeService {
  constructor(private http: HttpClient) {}

  public getStates = (): Observable<any> => {
    return this.http.get(`${urlIBGE}/estados`);
  };

  public getCities = (uf: string): Observable<any> => {
    return this.http.get(`${urlIBGE}/estados/${uf}/distritos`);
  };
}
