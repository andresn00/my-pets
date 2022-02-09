import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { SingleResponse } from 'src/app/Models/RestObjects';
import { Session } from 'src/app/Models/Session';
import { User } from 'src/app/Models/User';
import { Vet } from 'src/app/Models/Vet';
import { SignupService } from 'src/app/services/auth/signup.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-signup-vet',
  templateUrl: './signup-vet.component.html',
  styleUrls: ['./signup-vet.component.scss']
})
export class SignupVetComponent implements OnInit {

  hidePassword: boolean = true
  signupInProgress: boolean = false

  vetFormTitle: string = 'Datos de la veterinaria'
  accountFormTitle: string = 'Datos del usuario principal'

  vetForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    ruc: new FormControl(),
    address: new FormControl('', Validators.required),
    phone: new FormControl(),
    avatar: new FormControl()
  })
  accountForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl()
  })

  constructor(
    private signupService: SignupService,
    private storageService: StorageService,
    private router: Router,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }


  onFormsSubmit() {
    if (!this.vetForm.valid || !this.accountForm.valid) return
    const vet: Vet = <Vet>this.vetForm.value
    const user: User = <User>this.accountForm.value
    user.isEmployee = true
    const employee: Employee = {
      name: vet.name,
      ci: vet.ruc,
      address: vet.address,
      phone: vet.phone
    }
    this.signup(vet, user, employee);
  }

  private signup(vet: Vet, user: User, employee: Employee) {
    this.signupInProgress = true
    this.signupService.registerVet(vet).subscribe({
      next: (vetRes: SingleResponse<Vet>) => {
        this.signupService.registerUser(user).subscribe({
          next: (userSession: Session) => {
            console.log(`userRes`, userSession)
            employee.user = userSession.user.id;
            employee.vet = vetRes.data.id;
            this.signupService.registerEmployee(employee).subscribe({
              next: (employeeRes: SingleResponse<Employee>) => {
                this.storageService.setCurrentSession(userSession)
                this.router.navigate(['../dashboard']).then(() => {
                  this.uiService.openNotificationSnackBar('Veterinaria registrada con éxito.', 'primary')
                })
              },
              error: err => {
                console.log(`err employee`, err);
                this.signupService.rollbackUser(userSession.user.id).subscribe()
                this.signupService.rollbackVet(vetRes.data.id).subscribe()
                const errMessage = err.status === 400 ? 'Registro existente' : 'Error creando registro'
                this.uiService.openNotificationSnackBar(errMessage, 'warn')
                this.signupInProgress = false
              }
            });
          },
          error: err => {
            console.log(`err user`, err);
            this.signupService.rollbackVet(vetRes.data.id).subscribe()
            const errMessage = err.status === 400 ? 'Email en uso' : 'Error creando registro'
            this.uiService.openNotificationSnackBar(errMessage, 'warn')
            this.signupInProgress = false
          }
        });
      },
      error: err => {
        console.log(`err vet`, err)
        const errMessage = err.status === 400 ? 'Veterinaria existente' : 'Error creando registro'
        this.uiService.openNotificationSnackBar(errMessage, 'warn')
        this.signupInProgress = false
      }
    });
  }
}

// TODO: spinner when sign up in progress