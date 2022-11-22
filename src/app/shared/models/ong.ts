import { User } from '@shared/services/user';
import { Address } from './address';
import { BaseModel } from './base-model';
import { Speciality } from './speciality';

export class Ong extends BaseModel {
  public name: string;
  public address_id?: string;
  public specialities?: Speciality[];
  public specialists?: any[];
  public address?: Address;

  public override deserialize(input: any): this {
    input.specialities = input.specialities
      ? input.specialities.map((speciality) =>
          new Speciality().deserialize(speciality)
        )
      : [];

    input.specialists = input.specialists
      ? input.specialists.map((specialist) =>
          new User().deserialize(specialist)
        )
      : [];

    Object.assign(this, input);
    return this;
  }

  public hasSpecialist = (specialistId: string): boolean =>
    this.specialists.some((specialist) => specialist.user_id === specialistId);
}
