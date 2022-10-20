import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<any>,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>
  ) { }

  ngOnInit(): void {
    const formData = this.data.formData
    if (formData) {
      this.empForm.patchValue({...formData.employee})
      this.userForm.patchValue({...formData.user})
    }
  }

  closeDialog(){
    if (!this.empForm.valid || !this.userForm.valid) return
    const formsData = {
      employee: this.empForm.value,
      user: this.userForm.value,
    }
    this.dialogRef.close(formsData)
  }
}
