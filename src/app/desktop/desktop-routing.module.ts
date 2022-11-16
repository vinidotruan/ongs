import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './desktop.component';
import { HomeComponent } from './home/home.component';
import { SchedulesManagementComponent } from './schedules-management/schedules-management.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesktopRoutingModule {}
