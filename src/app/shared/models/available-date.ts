import { User } from '@shared/services/user';
import { BaseModel } from './base-model';
import { Speciality } from './speciality';

export class AvailableDate extends BaseModel {
  public date: string;
  public end_time: string;
  public interval_time: string;
  public duration_time: string;
  public start_time: string;
  public professionals?: User[];
  public available: boolean;

  public day = (): number => new Date(this.date).getDate() + 1;
  public month = (): number => new Date(this.date).getMonth() + 1;

  public initial_hour = (): string =>
    `${new Date(`${this.date} ${this.start_time}`).getUTCHours()}:${new Date(
      `${this.date} ${this.start_time}`
    ).getUTCMinutes()}`;

  public final_hour = (): string =>
    `${new Date(`${this.date} ${this.start_time}`).getUTCHours()}:${new Date(
      `${this.date} ${this.end_time}`
    ).getUTCMinutes()}`;
}
