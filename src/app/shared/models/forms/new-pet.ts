import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fillForm } from './fill-form';
import { ReactiveFormInterface } from './form';

export class NewPetForm implements ReactiveFormInterface {
  form = (fill?: any): FormGroup =>
    new FormGroup({
      id: new FormControl(fillForm(fill ?? 'text')),
      name: new FormControl(fillForm(fill ?? 'text'), Validators.required),
      birth_date: new FormControl(fillForm(fill ?? 'text')),
      breed_id: new FormControl(fillForm(fill ?? 'text'), Validators.required),
      size_id: new FormControl(fillForm(fill ?? 'text'), Validators.required),
    });
}
