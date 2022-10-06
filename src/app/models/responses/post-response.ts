import { ApiResponse } from './api-response';

export interface PostResponse<T> extends ApiResponse<T> {
  data: T;
}
