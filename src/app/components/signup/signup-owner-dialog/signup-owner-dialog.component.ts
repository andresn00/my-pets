import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openNotificationSnackBar } from 'src/app/utils';

@Component({
  selector: 'app-signup-owner-dialog',
  templateUrl: './signup-owner-dialog.component.html',
  styleUrls: ['./signup-owner-dialog.component.scss']
})
export class SignupOwnerDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SignupOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSignupCompleted(){
    openNotificationSnackBar(this.snackBar,  'Cliente registrado con éxito.', 'primary')
    this.dialogRef.close()
  }
}
