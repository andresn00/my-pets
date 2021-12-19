import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true

  loginForm: FormGroup = new FormGroup({
    identifier: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (this.loginForm.valid) {
      //TODO: start spinner
      this.loginService.login(this.loginForm.value).subscribe({
        next: res => {
          console.log(`res`, res)
          //TODO: next route: DASHBOARD
        },
        error: err => {
          console.log(`err`, err)
          //TODO: show snackbar
        },
        complete: () => {
          //TODO: stop spinner
        }

      })
    }
  }

}
