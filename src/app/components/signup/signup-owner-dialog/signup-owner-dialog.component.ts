import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-signup-owner-dialog',
  templateUrl: './signup-owner-dialog.component.html',
  styleUrls: ['./signup-owner-dialog.component.scss']
})
export class SignupOwnerDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SignupOwnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }

  onSignupCompleted(){
    this.uiService.openNotificationSnackBar('Cliente registrado con éxito.', 'primary')
    this.dialogRef.close()
  }
}
