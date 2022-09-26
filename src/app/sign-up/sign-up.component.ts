import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  constructor(private ibgeService: IbgeService) {
    this.form = new SignUpForm().form(false);
  }

  ngOnInit(): void {
    this.getStates();
    this.listenFormChange();
  }

  public getCities = (uf: string) =>
    this.ibgeService.getCities(uf).subscribe({
      next: (response) => {
        this.cities = response;
        console.log(response);
      },
      error: (error) => console.log(error),
    });

  private getStates = () =>
    this.ibgeService.getStates().subscribe({
      next: (response) => {
        this.states = response;
        console.log(response);
      },
      error: (error) => alert(error),
    });

  private listenFormChange = () => {
    this.form.get('address.state')?.valueChanges.subscribe({
      next: (response) => this.getCities(response),
      error: (error) => alert(error),
    });
  };
}
