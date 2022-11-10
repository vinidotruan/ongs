import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guard/auth.guard';
import { AppointmentCreateComponent } from './appointments/appointment-create/appointment-create.component';
import { DesktopRoutingModule } from './desktop/desktop-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PetsFormComponent } from './pets/pets-form/pets-form.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
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
    path: 'desktop',
    loadChildren: () =>
      import('./desktop/desktop.module').then((m) => m.DesktopModule),
  },
  {
    path: 'appointments/new',
    component: AppointmentCreateComponent,
    canActivate: [AuthGuard],
    data: { animation: 'newAppointmentPage' },
  },
  {
    path: 'appointments',
    redirectTo: 'appointments/new',
  },
  {
    path: 'pets',
    component: PetsListComponent,
    canActivate: [AuthGuard],
    data: { animation: 'petsList' },
  },
  {
    path: 'pets/create',
    component: PetsFormComponent,
    canActivate: [AuthGuard],
    data: { animation: 'petForm' },
  },
  {
    path: 'pets/:petId',
    component: PetsFormComponent,
    canActivate: [AuthGuard],
    data: { animation: 'petForm' },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
    data: { animation: 'logoutPage' },
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
