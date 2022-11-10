import { imageByBreeds } from '@shared/helpers/image-breeds';
import { BaseModel } from './base-model';

export class Pet extends BaseModel {
  public name: string;
  public birth_date: string;
  public breed_id: string;
  public size_id: string;
  public breed?;
  public size?;
  public icon?;

  public aniversary = () => {
    const ms = new Date().getTime() - new Date(this.birth_date).getTime();
    const date = new Date(ms);

    return Math.abs(date.getUTCFullYear() - 1970);
  };

  public defaultIcon = () => imageByBreeds[this.breed_id];
}
