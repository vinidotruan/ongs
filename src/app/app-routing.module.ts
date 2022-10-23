import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guard/auth.guard';
import { AppointmentCreateComponent } from './appointments/appointment-create/appointment-create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'loginPage' },
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: { animation: 'signupPage' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'homePage' },
  },
  {
    path: 'appointments/new',
    component: AppointmentCreateComponent,
    canActivate: [AuthGuard],
    data: { animation: 'newAppointmentPage' },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: { animation: 'loginPage' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
