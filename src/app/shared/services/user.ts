import { BaseModel } from '@models/base-model';
import { Pet } from '@models/pet';

export class User extends BaseModel {
  public id?: string;
  public name: string;
  public phone: string;
  public email: string;
  public address_id: string;
  public type_user_id: string;
  public email_verified_at: string;
  public pets?: Pet[];

  public override deserialize(input: any): this {
    super.deserialize(input);
    this.pets = this.pets.map((pet) => new Pet().deserialize(pet));
    console.log(this);
    return this;
  }
}
