import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fillForm } from './fill-form';
import { ReactiveFormInterface } from './form';

export class NewPetForm implements ReactiveFormInterface {
  form = (fill?: any): FormGroup =>
    new FormGroup({
      name: new FormControl(fillForm(fill ?? 'text'), Validators.required),
      breed_id: new FormControl(fillForm(fill ?? 'text'), Validators.required),
      size_id: new FormControl(fillForm(fill ?? 'text'), Validators.required),
    });
}
