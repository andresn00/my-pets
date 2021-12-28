import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Session } from 'src/app/Models/Session';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { StorageService } from 'src/app/services/storage.service';
import { openNotificationSnackBar } from 'src/app/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true
  loginInProgress: boolean = false

  loginForm: FormGroup = new FormGroup({
    identifier: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthenticationService,
    private storageService: StorageService,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (!this.loginForm.valid) {
      openNotificationSnackBar(this.snackBar, 'Email o contraseña inválidos', 'warn')
      return
    }
    this.loginInProgress = true
    this.authService.login(this.loginForm.value).subscribe({
      next: (session: Session) => {
        this.storageService.setCurrentSession(session)
        if (session.user.isEmployee){
          this.router.navigate(['./dashboard'])
        } else {
          // this.router.navigate(['./pets'])
        }
      },
      error: err => {
        openNotificationSnackBar(this.snackBar, 'Email o contraseña inválidos', 'warn')
        this.loginInProgress = false
      }
    })
  }

}
