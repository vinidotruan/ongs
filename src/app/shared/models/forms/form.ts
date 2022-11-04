import { FormGroup } from '@angular/forms';

export interface ReactiveFormInterface {
  form(fill?: boolean | string): FormGroup;
}
