import { AvailableDate } from './available-date';
import { BaseModel } from './base-model';
import { Ong } from './ong';
import { Pet } from './pet';

export class Scheduling extends BaseModel {
  public description;
  public pet_id;
  public schedule_id;
  public type_scheduling_id;
  public ong_id;
  public date?;
  public hour?;

  public pet?: Pet;
  public schedule?: AvailableDate;
  public ong?: Ong;
  public type_scheduling?: any;

  public override deserialize(input: any): this {
    input.pet = new Pet().deserialize(input.pet);
    input.schedule = new AvailableDate().deserialize(input.schedule);
    input.ong = new Ong().deserialize(input.ong);
    input.date = new Date(input.date).toLocaleDateString();
    Object.assign(this, input);
    return this;
  }
}
