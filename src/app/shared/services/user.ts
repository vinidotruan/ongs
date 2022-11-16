import { BaseModel } from '@models/base-model';
import { Pet } from '@models/pet';
import { AvailableDate } from '@models/available-date';
import { Ong } from '@models/ong';
export class User extends BaseModel {
  public name: string;
  public phone: string;
  public email: string;
  public address_id: string;
  public type_user_id: number;
  public email_verified_at: string;
  public pets?: Pet[];
  public schedules?: AvailableDate[];
  public ongs?: Ong[];

  public isSpecialist = (): boolean => {
    return this.type_user_id === 1;
  };

  public override deserialize(input: any): this {
    input.pets = input.pets
      ? input.pets.map((pet) => new Pet().deserialize(pet))
      : [];

    input.schedules = input.schedules
      ? input.schedules.map((schedule) =>
          new AvailableDate().deserialize(schedule)
        )
      : [];

    input.ongs = input.ongs
      ? input.ongs.map((ong) => new Ong().deserialize(ong))
      : [];

    Object.assign(this, input);
    return this;
  }
}
