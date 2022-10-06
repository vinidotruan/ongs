export interface ApiRequest {
  path: string;
  params?: any;
  deserializeAs?: any;
  options?: any;
}

export interface PostRequest extends ApiRequest {
  body: any;
}
