import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  openNotificationSnackBar(message: string, color: string, time: number = 3000){
    this.snackBar.open(message, '', {
      duration: time,
      panelClass: ['mat-toolbar', `mat-${color}`]  
    })
  }
}
