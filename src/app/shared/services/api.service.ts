import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiRequest, PostRequest } from '@models/requests/api-request';
import { ApiResponse } from '@models/responses/api-response';
import { DeleteResponse } from '@models/responses/delete-response';
import { IndexResponse } from '@models/responses/index-response';
import { PostResponse } from '@models/responses/post-response';
import { PutResponse } from '@models/responses/put-response';
import { ShowResponse } from '@models/responses/show-response';
import { environment } from 'src/environments/environment';

export const pipeDeserializeList = <T>(deserializeAs) =>
  map((response: any) => {
    if (deserializeAs) {
      const list = response.data as T[];
      response.data = list.map((data: T) =>
        new deserializeAs().deserialize(data)
      );
    }
    return response;
  });

export const pipeDeserializeObject = <T>(deserializeAs) =>
  map((response: any) => {
    if (deserializeAs) {
      const data = response.data as T;
      response.data = new deserializeAs().deserialize(data);
    }

    return response;
  });

export const convertParamsToApi = (filters: [string, any, any?][]) => {
  if (!(filters instanceof Array)) {
    return filters;
  }

  return filters.reduce((carry: any, filterOption) => {
    let fieldName: string;
    let operator;
    let value;

    if (filterOption.length === 2) {
      [fieldName, value] = filterOption;
    } else if (filterOption.length === 3) {
      [fieldName, operator, value] = filterOption;
    } else {
      [fieldName, value] = filterOption;
    }

    carry[fieldName] = value;

    return carry;
  }, {});
};
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  index<T>(request: ApiRequest): Observable<IndexResponse<T>> {
    const path = environment.api + request.path;
    const params = request.params;

    return this.http
      .get<IndexResponse<T>>(path, { params })
      .pipe(pipeDeserializeList(request.deserializeAs));
  }

  show<T>(request: ApiRequest): Observable<ShowResponse<T>> {
    const path = environment.api + request.path;
    const params = request.params || [];

    return this.http
      .get<ShowResponse<T>>(path, { params })
      .pipe(pipeDeserializeObject<ShowResponse<T>>(request.deserializeAs));
  }

  get<T>(request: ApiRequest): Observable<ApiResponse<T>> {
    const path = environment.api + request.path;
    const params = request.params || [];

    return this.http
      .get<ApiResponse<T>>(path, { params })
      .pipe(pipeDeserializeList(request.deserializeAs));
  }

  post<T>(request: PostRequest): Observable<PostResponse<T>> {
    const path = environment.api + request.path;
    const body = request.body;

    return this.http
      .post<PostResponse<T>>(path, body)
      .pipe(pipeDeserializeObject<ShowResponse<T>>(request.deserializeAs));
  }

  put<T>(request: PostRequest): Observable<PutResponse<T>> {
    const path = environment.api + request.path;
    const body = request.body;

    return this.http
      .put<PutResponse<T>>(path, body)
      .pipe(pipeDeserializeObject<ShowResponse<T>>(request.deserializeAs));
  }

  delete<T>(request: ApiRequest): Observable<DeleteResponse<T>> {
    const path = environment.api + request.path;
    const params = request.params;

    return this.http.delete<DeleteResponse<T>>(path, { params });
  }

  // upload(request: PostRequest): Observable<HttpEvent<any>> {
  //   const path = environment.api + request.path;
  //   const body = request.body;
  //   const observer = this.http.post<PostResponse<any>>(path, body, {
  //     reportProgress: true,
  //     observe: 'events',
  //   });

  //   return observer.pipe(map((snakeResponse) => convertToCamel(snakeResponse)));
  // }
}
