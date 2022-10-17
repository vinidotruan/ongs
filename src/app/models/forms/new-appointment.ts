import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormInterface } from './form';

export class NewAppointmentForm implements ReactiveFormInterface {
  form = (fill?: any) =>
    new FormGroup({
      speciality: new FormControl(null, Validators.required),
      max_distance: new FormControl(null, Validators.required),
    });
}
