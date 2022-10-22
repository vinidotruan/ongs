import { BaseModel } from './base-model';

export class Address extends BaseModel {
  public id: string;
  public city_id: string;
  public neighborhood: string;
  public street: string;
  public number: string;
  public cep: string;
}
