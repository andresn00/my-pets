import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/Models/Customer';
import { Session } from 'src/app/Models/Session';
import { User } from 'src/app/Models/User';
import { SignupService } from 'src/app/services/signup.service';
import { openNotificationSnackBar } from 'src/app/utils';

@Component({
  selector: 'app-signup-owner-form',
  templateUrl: './signup-owner-form.component.html',
  styleUrls: ['./signup-owner-form.component.scss']
})
export class SignupOwnerFormComponent implements OnInit {
  @Input() vetId: number | null = null
  @Output() signupCompleted = new EventEmitter<any>()

  hidePassword: boolean = true
  signupInProgress: boolean = false

  customerFormTitle: string = 'Datos personales'
  accountFormTitle: string = 'Datos del usuario'

  customerForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    ci: new FormControl(),
    address: new FormControl(),
    phone: new FormControl(),
  })
  accountForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl()
  })

  constructor(
    private signupService: SignupService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onFormsSubmit() {
    if (!this.customerForm.valid || !this.accountForm.valid) return
    const customer: Customer = <Customer>this.customerForm.value
    const user: User = <User>this.accountForm.value
    // TODO: asign vets to customer
    this.signup(customer, user)
  }

  signup(customer: Customer, user: User) {
    this.signupInProgress = true
    this.signupService.registerUser(user)
      .subscribe({
        next: (userSession: Session) => {
          customer.user = userSession.user.id
          customer.vets = this.vetId ? [this.vetId] : null
          this.signupService.registerCustomer(customer)
            .subscribe({
              next: (customerRes) => {
                const emitObj = {
                  userSession,
                  customer: customerRes
                }
                this.signupCompleted.emit(emitObj)
              },
              error: (err) => {
                this.signupService.rollbackUser(userSession.user.id).subscribe()
                const errMessage = err.status === 400 ? 'Registro existente' : 'Error creando registro'
                openNotificationSnackBar(this.snackBar, errMessage, 'warn')
                this.signupInProgress = false
              }
            })
        },
        error: err => {
          const errMessage = err.status === 400 ? 'Email en uso' : 'Error creando registro'
          openNotificationSnackBar(this.snackBar, errMessage, 'warn')
          this.signupInProgress = false
        }
      })
  }

}
