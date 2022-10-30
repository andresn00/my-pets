import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vet } from 'src/app/Models/Vet';
import { VetService } from 'src/app/services/collections/vet.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-edit-vet-dialog',
  templateUrl: './edit-vet-dialog.component.html',
  styleUrls: ['./edit-vet-dialog.component.scss']
})
export class EditVetDialogComponent implements OnInit {
  vetForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ruc: new FormControl('', Validators.required),
    phone: new FormControl(),
    address: new FormControl(''),
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Vet>,
    private dialogRef: MatDialogRef<EditVetDialogComponent>,
    private vetService: VetService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.vetForm.patchValue({ ...this.data.formData })
  }

  onSave() {
    this.vetService.updateVet(this.data.formData?.id as number, this.vetForm.value)
      .subscribe(res => {
        this.uiService.openNotificationSnackBar('Veterinaria actualizada', 'primary')
        this.dialogRef.close(res)
      })
  }

}
