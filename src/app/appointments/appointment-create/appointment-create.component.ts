import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NewAppointmentForm } from '@models/forms/new-appointment';
import { Ong } from '@models/ong';
import { Pet } from '@models/pet';
import { Speciality } from '@models/speciality';
import { AuthService } from '@shared/services/auth.service';
import { SpecialitiesService } from '@shared/services/specialities.service';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.scss'],
})
export class AppointmentCreateComponent implements OnInit {
  public form: FormGroup;
  public maxDistance = 0;
  public specialities: Speciality[];
  public ongs: Ong[] = [];
  public pets: Pet[] = [];

  constructor(
    private specialitiesService: SpecialitiesService,
    private authService: AuthService
  ) {
    this.form = new NewAppointmentForm().form();
  }

  ngOnInit(): void {
    this.listenChangeSlider();
    this.getSpecialities();
    this.getPets();
  }

  public specialitySelected = (speciality: string) => {
    this.form.patchValue({ speciality_id: speciality });
    this.getOngsBySpeciality(speciality);
  };

  public ongSelected = (ong: string) => {
    this.form.patchValue({ ong_id: ong });
    this.getPets();
  };

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

  private getSpecialities = () => {
    this.specialitiesService.getAll().subscribe({
      next: ({ data }) => (this.specialities = data as Speciality[]),
      error: (error) => alert(error),
    });
  };

  private getOngsBySpeciality = (speciality: string) => {
    this.specialitiesService.getOngsBySpeciality(speciality).subscribe({
      next: ({ data }) => (this.ongs = data as Ong[]),
      error: (error) => alert(error),
    });
  };

  private getPets = () => {
    this.pets = this.authService.currentUser?.pets;
  };
}
