import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';

const routes: Routes = [
  { path: 'login', canActivate: [UnauthGuard], component: LoginComponent },
  { path: 'signup', canActivate: [UnauthGuard], component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
