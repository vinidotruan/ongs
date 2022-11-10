import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesktopRoutingModule } from './desktop-routing.module';
import { DesktopComponent } from './desktop.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@NgModule({
  declarations: [DesktopComponent, HomeComponent, SidebarComponent],
  imports: [CommonModule, DesktopRoutingModule],
  exports: [SidebarComponent],
  bootstrap: [DesktopComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DesktopModule {}
