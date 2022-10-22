export abstract class BaseModel {
  public created_at;
  public updated_at;

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
