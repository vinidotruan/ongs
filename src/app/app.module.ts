import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HomeComponent } from './home/home.component';
import { AppointmentCreateComponent } from './appointments/appointment-create/appointment-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    SignUpComponent,
    HeaderComponent,
    HomeComponent,
    AppointmentCreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
