import { ApiResponse } from './api-response';

export interface ShowResponse<T> extends ApiResponse<T> {
  data: T;
}
