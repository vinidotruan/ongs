import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormInterface } from './form';

export class NewAppointmentForm implements ReactiveFormInterface {
  form = (fill?: any) =>
    new FormGroup({
      pet_id: new FormControl(null, Validators.required),
      schedule_id: new FormControl(null, Validators.required),
      type_scheduling_id: new FormControl(null, Validators.required),
      ong_id: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      speciality_id: new FormControl(null, Validators.required),
    });
}
