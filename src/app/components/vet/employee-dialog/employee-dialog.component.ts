import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/Models/Employee';
import { FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit {

  empForm = new FormGroup({
    name: new FormControl(),
    ci: new FormControl(),
    phone: new FormControl(),
    address: new FormControl(),
  })
  
  userForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Employee>,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    
  }
}
