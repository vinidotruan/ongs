import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop.component';
import { HomeComponent } from './home/home.component';
import { SchedulesManagementComponent } from './schedules-management/schedules-management.component';
import { CreateComponent } from './specialist/create/create.component';
import { RegisterComponent } from './specialist/register/register.component';

const routes: Routes = [
  {
    path: 'desktop',
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
        children: [
          { path: 'register', component: RegisterComponent },
          { path: 'create', component: CreateComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesktopRoutingModule {}
