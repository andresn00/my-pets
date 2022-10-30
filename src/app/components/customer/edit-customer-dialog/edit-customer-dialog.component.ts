import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/Models/Customer';
import { CustomerService } from 'src/app/services/collections/customer.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-edit-customer-dialog',
  templateUrl: './edit-customer-dialog.component.html',
  styleUrls: ['./edit-customer-dialog.component.scss']
})
export class EditCustomerDialogComponent implements OnInit {
  customerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ci: new FormControl('', Validators.required),
    phone: new FormControl(),
    address: new FormControl(''),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Customer>,
    private dialogRef: MatDialogRef<EditCustomerDialogComponent>,
    private customerService: CustomerService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.customerForm.patchValue({ ...this.data.formData })
  }

  onSave() {
    this.customerService.updateCustomer(this.data.formData?.id as number, this.customerForm.value)
      .subscribe(res => {
        this.uiService.openNotificationSnackBar('Cliente actualizado', 'primary')
        this.dialogRef.close(res)
      })
  }
}
