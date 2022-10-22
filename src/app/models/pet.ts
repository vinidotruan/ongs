import { BaseModel } from './base-model';

export class Pet extends BaseModel {
  public id?: string;
  public name: string;
  public breed_id: string;
  public size_id: string;
}
