export abstract class BaseModel {
  public id?;
  public created_at;
  public updated_at;
  public pivot?;

  public deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
