import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Session } from 'src/app/Models/Session';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { openNotificacionSnackBar } from 'src/app/utils';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (!this.loginForm.valid) {
      openNotificacionSnackBar(this.snackBar, 'Email o contraseña inválidos', 'warn')
      return
    }
    this.loginInProgress = true
    this.authService.login(this.loginForm.value).subscribe({
      next: (session: Session) => {
        // TODO: fetch whole user and store it
        // TODO: redirect: vet ? dashboard : pets
        this.storageService.setCurrentSession(session)
        this.router.navigate(['./dashboard'])
      },
      error: err => {
        openNotificacionSnackBar(this.snackBar, 'Email o contraseña inválidos', 'warn')
        this.loginInProgress = false
      }
    })
  }

}
