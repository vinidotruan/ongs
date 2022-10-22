import { BaseModel } from './base-model';
import { Ong } from './ong';

export class Speciality extends BaseModel {
  public id: string;
  public name: string;
  public description: string;
  public ongs?: Ong[];
}
