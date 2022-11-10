import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoComponent } from './shared/components/logo/logo.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HomeComponent } from './home/home.component';
import { AppointmentCreateComponent } from './appointments/appointment-create/appointment-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { BottomBarComponent } from './shared/components/bottom-bar/bottom-bar.component';
import { PetsListComponent } from './pets/pets-list/pets-list.component';
import { PetCardComponent } from './shared/components/pet-card/pet-card.component';
import { PetsFormComponent } from './pets/pets-form/pets-form.component';
import { ViewWrapperComponent } from './shared/components/view-wrapper/view-wrapper.component';
import { FloatButtonComponent } from './shared/components/float-button/float-button.component';
import { LogoutComponent } from './logout/logout.component';
import { AlertSuccessComponent } from './shared/components/modals/alert-success/alert-success.component';
import { SchedulingCardComponent } from './shared/components/scheduling-card/scheduling-card.component';
import { DesktopModule } from './desktop/desktop.module';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoComponent,
    SignUpComponent,
    HeaderComponent,
    HomeComponent,
    AppointmentCreateComponent,
    CalendarComponent,
    BottomBarComponent,
    PetsListComponent,
    PetCardComponent,
    PetsFormComponent,
    ViewWrapperComponent,
    FloatButtonComponent,
    LogoutComponent,
    AlertSuccessComponent,
    SchedulingCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot(),
    NgbModule,
    DesktopModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
