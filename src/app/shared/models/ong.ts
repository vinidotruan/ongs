import { Address } from './address';
import { BaseModel } from './base-model';
import { Speciality } from './speciality';

export class Ong extends BaseModel {
  public name: string;
  public address_id?: string;
  public specialities?: Speciality[];
  public address?: Address;
}
