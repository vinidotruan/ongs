import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignUpForm } from '@models/forms/signup';
import { AuthService } from '@shared/services/auth.service';
import { OngService } from '@shared/services/ong.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  public states: any[] = [];
  public cities: any[] = [];

  constructor(
    private authService: AuthService,
    private ongService: OngService
  ) {
    this.form = new SignUpForm().form(false);
  }

  ngOnInit(): void {
    this.getStates();
    this.listenFormChange();

    const type_user_id = 1;
    this.form.patchValue({ type_user_id });
  }

  public getCities = (uf: string) =>
    this.ongService.getCities(uf).subscribe({
      next: (response) => (this.cities = response.data.cities),
      error: (error) => console.log(error),
    });

  public signup = () => {
    this.authService.signupApi(this.form.value).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  };

  private getStates = () =>
    this.ongService.getStates().subscribe({
      next: (response) => (this.states = response.data),
      error: (error) => alert(error),
    });

  private listenFormChange = () => {
    this.form.get('state')?.valueChanges.subscribe({
      next: (response) => this.getCities(response),
      error: (error) => alert(error),
    });
  };
}
