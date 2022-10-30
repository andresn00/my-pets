import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/Models/Employee';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-edit-employee-dialog',
  templateUrl: './edit-employee-dialog.component.html',
  styleUrls: ['./edit-employee-dialog.component.scss']
})
export class EditEmployeeDialogComponent implements OnInit {
  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ci: new FormControl('', Validators.required),
    phone: new FormControl(),
    address: new FormControl(''),
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Employee>,
    private dialogRef: MatDialogRef<EditEmployeeDialogComponent>,
    private employeeService: EmployeeService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.employeeForm.patchValue({ ...this.data.formData })
  }

  onSave() {
    this.employeeService.updateEmployee(this.data.formData?.id as number, this.employeeForm.value)
      .subscribe(res => {
        this.uiService.openNotificationSnackBar('Empleado actualizado', 'primary')
        this.dialogRef.close(res)
      })
  }

}
