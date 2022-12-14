import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fillForm } from './fill-form';
import { ReactiveFormInterface } from './form';

export class SignUpForm implements ReactiveFormInterface {
  form = (fill?: any): FormGroup =>
    new FormGroup({
      name: new FormControl(fillForm(fill ?? 'text'), Validators.required),
      phone: new FormControl(fillForm(fill ?? 'text'), Validators.required),
      email: new FormControl(fillForm(fill ?? 'email'), Validators.required),
      type_user_id: new FormControl(
        fillForm(fill ?? 'number'),
        Validators.required
      ),
      password: new FormControl(fillForm(fill), Validators.required),
      password_confirmation: new FormControl(
        fillForm(fill),
        Validators.required
      ),
      state: new FormControl(fillForm(fill), Validators.required),
      city_id: new FormControl(fillForm(fill), Validators.required),
      neighborhood: new FormControl(fillForm(fill)),
      street: new FormControl(fillForm(fill), Validators.required),
      number: new FormControl(fillForm(fill), Validators.required),
      cep: new FormControl(fillForm(fill)),
      ong: new FormGroup({
        name: new FormControl(fillForm(fill)),
        cnpj: new FormControl(fillForm(fill)),
      }),
    });
}
