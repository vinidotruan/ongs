import { ApiResponse } from './api-response';

interface IndexRequestLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IndexResponse<T> extends ApiResponse<T> {
  currentPage?: number;
  from?: number;
  to?: number;
  lastPage?: number;
  perPage?: number;
  total?: number;
  firstPageUrl?: string;
  lastPageUrl?: string;
  nextPageUrl?: string;
  prevPageUrl?: string;
  links?: IndexRequestLinks[];
  data: T[];
}
