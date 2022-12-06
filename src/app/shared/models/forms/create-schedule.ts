import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormInterface } from './form';

export class CreateScheduleForm implements ReactiveFormInterface {
  form = (fill?: any) =>
    new FormGroup({
      speciality_id: new FormControl(null, Validators.required),
      specialists_ids: new FormControl(null, Validators.required),
      start_date: new FormControl(null, Validators.required),
      final_date: new FormControl(null, Validators.required),
      duration: new FormControl(null, Validators.required),
      start_time: new FormControl(null, Validators.required),
      final_time: new FormControl(null, Validators.required),
      week_days: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ]),
      sizes_ids: new FormArray([]),
    });
}
