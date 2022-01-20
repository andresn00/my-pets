import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeAuthComponent } from './components/home-auth/home-auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupOptionsComponent } from './components/signup/signup-options/signup-options.component';
import { SignupOwnerComponent } from './components/signup/signup-owner/signup-owner.component';
import { SignupVetComponent } from './components/signup/signup-vet/signup-vet.component';
import { CustomersComponent } from './components/customer/customers/customers.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { CustomersPetsComponent } from './components/customer/customers-pets/customers-pets.component';
import { PetComponent } from './components/pet/pet/pet.component';
import { PetGeneralComponent } from './components/pet/pet-general/pet-general.component';

const routes: Routes = [
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
        path: 'pet', children: [
          {
            path: ':petId', component: PetComponent, children: [
              { path: 'general', component: PetGeneralComponent },
              { path: 'consulta-general', component: PetGeneralComponent },
              { path: '**', redirectTo: 'general' },
            ]
          },
        ]
      },
      { path: 'vet', component: CustomersComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
