import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { Session } from 'src/app/Models/Session';
import { Vet } from 'src/app/Models/Vet';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true
  loginInProgress: boolean = false

  loginForm: FormGroup = new FormGroup({
    identifier: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthenticationService,
    private storageService: StorageService,
    private employeeService: EmployeeService,
    private uiService: UiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (!this.loginForm.valid) {
      this.uiService.openNotificationSnackBar('Usuario o contraseña inválidos', 'warn')
      return
    }
    this.loginInProgress = true
    this.authService.login(this.loginForm.value).subscribe({
      next: (session: Session) => {
        this.storageService.setCurrentSession(session)
        if (session.user.isEmployee) {
          this.employeeService.fetchEmployeeByUserId(session.user.id as number, 'user,vet')
            .subscribe((emp: Employee) => {
              this.storageService.setCurrentEmployee(emp);
              const vetId = (emp.vet as SingleResponse<Vet>).data.id
              this.storageService.setCurrentVetId(vetId);
              this.router.navigate(['./'])
            });
        } else {
          // this.router.navigate(['./pets'])
        }
      },
      error: err => {
        this.uiService.openNotificationSnackBar('Usuario o contraseña inválidos', 'warn')
        this.loginInProgress = false
      }
    })
  }

}
