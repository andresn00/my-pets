import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Session } from 'src/app/Models/Session';
import { Customer } from 'src/app/Models/Customer';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-signup-owner',
  templateUrl: './signup-owner.component.html',
  styleUrls: ['./signup-owner.component.scss']
})
export class SignupOwnerComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private uiService: UiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSignUpCompleted(emitObj: any){
    console.log(`emitObj`, emitObj)
    const userSession: Session = emitObj.userSession
    const customer: Customer = emitObj.customer
    // this.storageService.setCurrentSession(userSession)
    // this.router.navigate(['../pets']).then(() => {
    //   this.uiService.openNotificationSnackBar('Veterinaria registrada con éxito.', 'primary')
    // })
  }
}
