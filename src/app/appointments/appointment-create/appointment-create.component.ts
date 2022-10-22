import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewAppointmentForm } from '@models/forms/new-appointment';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
})
export class AppointmentCreateComponent implements OnInit {
  public form: FormGroup;
  public maxDistance = 0;

  constructor() {
    this.form = new NewAppointmentForm().form();
  }

  ngOnInit(): void {
    this.listenChangeSlider();
  }

  public listenChangeSlider = () => {
    this.form.get('max_distance')?.valueChanges.subscribe({
      next: (value) => (this.maxDistance = value),
      error: (error) => {
        console.error(error);
      },
    });
  };

  public isActualMaxDistance = (actualDistance: number): boolean =>
    this.maxDistance == actualDistance;

  public dateClicked = (event: any) => {
    console.log(event);
  };
}
