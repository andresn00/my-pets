import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeAuthComponent } from './components/home-auth/home-auth.component';
import { LoginComponent } from './components/login/login.component';
import { SignupOptionsComponent } from './components/signup-options/signup-options.component';
import { SignupOwnerComponent } from './components/signup-owner/signup-owner.component';
import { SignupVetComponent } from './components/signup-vet/signup-vet.component';
import { UsersComponent } from './components/users/users.component';
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
  { 
    path: '', canActivate: [AuthGuard], component: HomeAuthComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'vet', component: UsersComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
