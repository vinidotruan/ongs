import { BaseModel } from '@models/base-model';
import { User } from './user';

export class LoginResponse extends BaseModel {
  token: string;
  user: User;
}
