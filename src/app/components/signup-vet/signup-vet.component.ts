import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/Employee';
import { RestObject } from 'src/app/Models/ResObject';
import { User } from 'src/app/Models/User';
import { Vet } from 'src/app/Models/Vet';
import { SignupService } from 'src/app/services/signup.service';
import { openNotificationSnackBar } from 'src/app/utils';

@Component({
  selector: 'app-signup-vet',
  templateUrl: './signup-vet.component.html',
  styleUrls: ['./signup-vet.component.scss']
})
export class SignupVetComponent implements OnInit {

  hidePassword: boolean = true
  signupInProgress: boolean = false

  vetFormTitle: string = 'Datos de la veterinaria'
  accountFormTitle: string = 'Datos de la cuenta principal'

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
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  onFormsSubmit() {
    if (!this.vetForm.valid) return
    if (!this.accountForm.valid) return
    const vetData: Vet = <Vet>this.vetForm.value
    const userData: User = <User>this.accountForm.value
    const employeeData: Employee = {
      name: vetData.name,
      ci: vetData.ruc,
      address: vetData.address,
      phone: vetData.phone
    }
    this.signUp(vetData, userData, employeeData);
  }

  private signUp(vetData: Vet, userData: User, employeeData: Employee) {
    this.signupInProgress = true
    this.signupService.createVet(vetData).subscribe({
      next: (vetRes: RestObject) => {
        this.signupService.createUser(userData).subscribe({
          next: (userRes: User) => {
            employeeData.user = userRes.id;
            employeeData.vet = vetRes.data.id;
            this.signupService.createEmployee(employeeData).subscribe({
              next: (employeeRes: RestObject) => {
                this.router.navigate(['../login']).then(() => {
                  openNotificationSnackBar(this.snackBar, 'Veterinaria registrada con éxito.', 'primary')
                })
              },
              error: err => {
                console.log(`err employee`, err);
                this.signupService.rollbackUser(userRes.id).subscribe()
                this.signupService.rollbackVet(vetRes.data.id).subscribe()
                const errMessage = err.status === 400 ? 'Registro existente' : 'Error creando registro'
                openNotificationSnackBar(this.snackBar, errMessage, 'warn')
                this.signupInProgress = false
              }
            });
          },
          error: err => {
            console.log(`err user`, err);
            this.signupService.rollbackVet(vetRes.data.id).subscribe()
            const errMessage = err.status === 400 ? 'Email en uso' : 'Error creando registro'
            openNotificationSnackBar(this.snackBar, errMessage, 'warn')
            this.signupInProgress = false
          }
        });
      },
      error: err => {
        console.log(`err vet`, err)
        const errMessage = err.status === 400 ? 'Veterinaria existente' : 'Error creando registro'
        openNotificationSnackBar(this.snackBar, errMessage, 'warn')
        this.signupInProgress = false
      }
    });
  }
}

// TODO: spinner when sign up in progress