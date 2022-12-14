import { BaseModel } from './base-model';
import { Ong } from './ong';

export class Speciality extends BaseModel {
  public name: string;
  public description: string;
  public ongs?: Ong[];
  public icon?: string;
}
