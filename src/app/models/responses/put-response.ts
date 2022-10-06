import { ApiResponse } from './api-response';

export interface PutResponse<T> extends ApiResponse<T> {
  data: T;
}
