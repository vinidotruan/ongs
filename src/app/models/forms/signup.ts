import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fillForm } from './fill-form';
import { ReactiveFormInterface } from './form';

export class SignUpForm implements ReactiveFormInterface {
  form = (fill?: any): FormGroup =>
    new FormGroup({
      email: new FormControl(fillForm(fill ?? 'email'), Validators.required),
      password: new FormControl(fillForm(fill), Validators.required),
      passwordConfirmation: new FormControl(
        fillForm(fill),
        Validators.required
      ),
      address: new FormGroup({
        state: new FormControl(fillForm(fill), Validators.required),
        city: new FormControl(fillForm(fill), Validators.required),
        neighborhood: new FormControl(fillForm(fill)),
        street: new FormControl(fillForm(fill), Validators.required),
        number: new FormControl(fillForm(fill), Validators.required),
        zipCode: new FormControl(fillForm(fill)),
      }),
    });
}
