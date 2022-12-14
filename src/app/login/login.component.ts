import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/user';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error?: any;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private deviceService: DeviceDetectorService
  ) {
    this.form = this.initForm();
  }

  ngOnInit(): void {}

  public login = () => {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.authService.setToken(`Bearer ${response.data.token}`);
        this.authService.setCurrentUser(
          new User().deserialize(response.data.user)
        );

        const url = this.deviceService.isDesktop()
          ? ['/desktop/home']
          : ['/mobile/home'];
        this.router.navigate(url);
      },
      error: (error) => (this.error = error),
    });
  };

  private initForm = (): FormGroup =>
    this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
}
