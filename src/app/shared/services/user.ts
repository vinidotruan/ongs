import { BaseModel } from '@models/base-model';
import { Pet } from '@models/pet';
import { AvailableDate } from '@models/available-date';
import { Ong } from '@models/ong';
import { Speciality } from '@models/speciality';

export class User extends BaseModel {
  public name: string;
  public phone: string;
  public email: string;
  public address_id: string;
  public type_user_id: number;
  public email_verified_at: string;
  public pets?: Pet[];
  public schedules?: AvailableDate[];
  public specialities?: Speciality[];
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

    input.specialities = input.specialities
      ? input.specialities.map((speciality) =>
          new Speciality().deserialize(speciality)
        )
      : [];

    Object.assign(this, input);
    return this;
  }
}

export class UserSpeciality extends BaseModel {
  public speciality_id: string;
  public user_id: string;

  public user?: User;
  public speciality?: Speciality;
  public schedules?: AvailableDate[];

  public override deserialize(input: any): this {
    input.user = input.user ? new User().deserialize(input.user) : {};
    input.speciality = input.speciality
      ? new Speciality().deserialize(input.speciality)
      : {};
    input.schedules = input.schedules
      ? input.schedules.map((schedules) =>
          new AvailableDate().deserialize(schedules)
        )
      : [];

    Object.assign(this, input);
    return this;
  }

  public hasSomeSchedule = () => this.schedules && this.schedules.length > 0;

  public hasScheduleOn = (date: Date) =>
    this.schedules.some(
      (schedule) =>
        new Date(`${schedule.date} EDT`).getTime() === date.getTime()
    );

  public getSchedulesOn = (date: Date) =>
    this.schedules.filter(
      (schedule) =>
        new Date(`${schedule.date} EDT`).getTime() === date.getTime()
    );
}
