import { User } from '@shared/services/user';
import { BaseModel } from './base-model';

export class AvailableDate extends BaseModel {
  public date: string;
  public end_time: string;
  public interval_time: string;
  public start_time: string;
  public professionals?: User[];

  public day = (): number => new Date(this.date).getDate() + 1;
  public month = (): number => new Date(this.date).getMonth() + 1;
}
