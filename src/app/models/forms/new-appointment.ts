import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormInterface } from './form';

export class NewAppointmentForm implements ReactiveFormInterface {
  form = (fill?: any) =>
    new FormGroup({
      max_distance: new FormControl(null, Validators.required),
      ong_id: new FormControl(null, Validators.required),
      speciality_id: new FormControl(null, Validators.required),
      pet_id: new FormControl(null, Validators.required),
      specialist_id: new FormControl(null, Validators.required),
      hour: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
}
