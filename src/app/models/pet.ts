import { BaseModel } from './base-model';

export class Pet extends BaseModel {
  public id?: string;
  public name: string;
  public birth_date: string;
  public breed_id: string;
  public size_id: string;
  public breed?;
  public size?;

  public aniversary() {
    console.log('opa');
    const ms = new Date().getTime() - new Date(this.birth_date).getTime();

    const date = new Date(ms);

    return Math.abs(date.getUTCFullYear() - 1970);
  }
}
