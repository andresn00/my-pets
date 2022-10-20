import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeAuthComponent } from './pages/home-auth/home-auth.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupOptionsComponent } from './pages/signup/signup-options/signup-options.component';
import { SignupOwnerComponent } from './pages/signup/signup-owner/signup-owner.component';
import { SignupVetComponent } from './pages/signup/signup-vet/signup-vet.component';
import { CustomersComponent } from './pages/customer/customers/customers.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { CustomersPetsComponent } from './pages/customer/customers-pets/customers-pets.component';
import { PetComponent } from './pages/pet/pet/pet.component';
import { VetComponent } from './pages/vet/vet.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PetHistoryComponent } from './pages/pet/pet-history/pet-history.component';
import { CalendarHomeComponent } from './pages/calendar/calendar-home/calendar-home.component';
import { HomeUnauthComponent } from './pages/home-unauth/home-unauth.component';

const routes: Routes = [
  { path: 'home', canActivate: [UnauthGuard], component: HomeUnauthComponent },
  { path: 'login', canActivate: [UnauthGuard], component: LoginComponent },
  {
    path: 'signup', canActivate: [UnauthGuard],
    children: [
      { path: 'vet', component: SignupVetComponent },
      { path: 'owner', component: SignupOwnerComponent },
      { path: 'options', component: SignupOptionsComponent },
      { path: '**', redirectTo: 'options' },
    ]
  },
  {
    path: '', canActivate: [AuthGuard], component: HomeAuthComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'customers', children: [
          { path: '', component: CustomersComponent },
          { path: ':customerId', component: CustomersPetsComponent },
          { path: '**', redirectTo: '' }
        ]
      },
      {
        path: 'pet/:petId', children: [
          { path: '', component: PetComponent },
          { path: 'historial', component: PetHistoryComponent },
        ]
      },
      { path: 'vet', component: VetComponent },
      { path: 'calendar', component: CalendarHomeComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
