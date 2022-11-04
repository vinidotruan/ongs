import { BaseModel } from './base-model';

export class Address extends BaseModel {
  public city_id: string;
  public neighborhood: string;
  public street: string;
  public number: string;
  public cep: string;
}
