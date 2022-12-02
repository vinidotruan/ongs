import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopComponent } from './desktop.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { DesktopRoutingModule } from './desktop-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SchedulesManagementComponent } from './schedules-management/schedules-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './specialist/register/register.component';
import { CreateComponent } from './specialist/create/create.component';

@NgModule({
  declarations: [
    DesktopComponent,
    HomeComponent,
    SidebarComponent,
    SchedulesManagementComponent,
    RegisterComponent,
    CreateComponent,
  ],
  imports: [
    DesktopRoutingModule,
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SidebarComponent, HomeComponent],
  bootstrap: [DesktopComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesktopModule {}
