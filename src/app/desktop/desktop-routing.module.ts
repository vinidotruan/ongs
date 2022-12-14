import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop.component';
import { HomeComponent } from './home/home.component';
import { SchedulesManagementComponent } from './schedules-management/schedules-management.component';
import { RegisterComponent } from './specialist/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: DesktopComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'management',
        component: SchedulesManagementComponent,
      },
      {
        path: 'specialist',
        children: [{ path: 'register', component: RegisterComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesktopRoutingModule {}
