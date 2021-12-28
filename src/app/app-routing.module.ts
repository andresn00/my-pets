import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupOptionsComponent } from './components/signup-options/signup-options.component';
import { SignupOwnerComponent } from './components/signup-owner/signup-owner.component';
import { SignupVetComponent } from './components/signup-vet/signup-vet.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  { path: 'login', canActivate: [UnauthGuard], component: LoginComponent },
  {
    path: 'signup', canActivate: [UnauthGuard],
    children: [
      { path: 'vet', component: SignupVetComponent},
      { path: 'owner', component: SignupOwnerComponent},
      { path: 'options', component: SignupOptionsComponent},
      { path: '**', redirectTo: 'options'},
    ]
  },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
