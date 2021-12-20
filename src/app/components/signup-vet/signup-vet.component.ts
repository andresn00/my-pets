import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-vet',
  templateUrl: './signup-vet.component.html',
  styleUrls: ['./signup-vet.component.scss']
})
export class SignupVetComponent implements OnInit {

  vetForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    ruc: new FormControl(),
    address: new FormControl(),
    phone: new FormControl(),
    avatar: new FormControl()
  })
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    avatar: new FormControl()
  })

  constructor() { }

  ngOnInit(): void {
  }

}
