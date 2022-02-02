import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment'
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import * as moment from 'moment'
export const momentAdapterFactory = () => {
  return adapterFactory(moment)
}

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es'
registerLocaleData(localeEs)

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MaterialElevationDirective } from './directives/material-elevation.directive';
import { SignupVetComponent } from './pages/signup-vet/signup-vet.component';
import { SignupOwnerComponent } from './pages/signup-owner/signup-owner.component';
import { SignupOptionsComponent } from './pages/signup-options/signup-options.component';
import { HomeAuthComponent } from './pages/home-auth/home-auth.component';
import { CustomersComponent } from './pages/customer/customers/customers.component'
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SignupOwnerFormComponent } from './components/signup/signup-owner-form/signup-owner-form.component';
import { SignupOwnerDialogComponent } from './components/signup/signup-owner-dialog/signup-owner-dialog.component';
import { CustomersPetsComponent } from './pages/customer/customers-pets/customers-pets.component';
import { PetsCardComponent } from './components/pet/pets-card/pets-card.component';
import { PetFormComponent } from './components/pet/pet-form/pet-form.component';
import { PetComponent } from './pages/pet/pet/pet.component';
import { ConfirmationDialogComponent } from './components/utils/confirmation-dialog/confirmation-dialog.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { VetComponent } from './pages/vet/vet.component';
import { PetHistoryComponent } from './pages/pet/pet-history/pet-history.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MaterialElevationDirective,
    SignupVetComponent,
    SignupOwnerComponent,
    SignupOptionsComponent,
    HomeAuthComponent,
    CustomersComponent,
    SignupOwnerFormComponent,
    SignupOwnerDialogComponent,
    CustomersPetsComponent,
    PetsCardComponent,
    PetFormComponent,
    PetComponent,
    ConfirmationDialogComponent,
    CalendarComponent,
    VetComponent,
    PetHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MomentDateModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatDividerModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatBadgeModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
