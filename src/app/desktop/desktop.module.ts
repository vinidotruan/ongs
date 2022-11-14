import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopComponent } from './desktop.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DesktopComponent, HomeComponent, SidebarComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent, HomeComponent],
  bootstrap: [DesktopComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesktopModule {}
