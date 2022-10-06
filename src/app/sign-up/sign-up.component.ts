import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { SignUpForm } from '../models/forms/signup';
import { IbgeService } from '../shared/services/ibge.service';

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
    private ibgeService: IbgeService,
    private authService: AuthService
  ) {
    this.form = new SignUpForm().form();
  }

  ngOnInit(): void {
    this.getStates();
    this.listenFormChange();
    this.form.patchValue({ type_user_id: 1 });
  }

  public getCities = (uf: string) =>
    this.ibgeService.getCities(uf).subscribe({
      next: (response) => (this.cities = response),
      error: (error) => console.log(error),
    });

  public signup = () => {
    this.authService.signupApi(this.form.value).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
    });
  };

  private getStates = () =>
    this.ibgeService.getStates().subscribe({
      next: (response) => (this.states = response),
      error: (error) => alert(error),
    });

  private listenFormChange = () => {
    this.form.get('state')?.valueChanges.subscribe({
      next: (response) => this.getCities(response),
      error: (error) => alert(error),
    });
  };
}
