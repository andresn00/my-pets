import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { Vet } from 'src/app/Models/Vet';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup-vet',
  templateUrl: './signup-vet.component.html',
  styleUrls: ['./signup-vet.component.scss']
})
export class SignupVetComponent implements OnInit {

  hidePassword: boolean = true

  vetFormTitle: string = 'Datos de la veterinaria'
  accountFormTitle: string = 'Datos de la cuenta principal'

  vetForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    ruc: new FormControl(),
    address: new FormControl(),
    phone: new FormControl(),
    avatar: new FormControl()
  })
  accountForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl()
  })

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
  }


  onFormsSubmit(){
    if (!this.vetForm.valid) return
    if (!this.accountForm.valid) return

    // TODO: send data to service
    this.signupService.signupVet(<Vet> this.vetForm.value, <User> this.accountForm.value)
  }
}
