import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Employee } from 'src/app/Models/Employee';
import { Vaccine } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetPageService } from 'src/app/services/pet-page.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { convertDateFormat, FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-vaccine-dialog',
  templateUrl: './vaccine-dialog.component.html',
  styleUrls: ['./vaccine-dialog.component.scss']
})
export class VaccineDialogComponent implements OnInit {
  currentVetId!: number
  vetEmployees!: Employee[]

  vaccForm = new FormGroup({
    date: new FormControl(moment().toDate(), Validators.required),
    time: new FormControl(moment().format('hh:mm A'), Validators.required),
    employees: new FormControl('', Validators.required),
    type: new FormControl(),
    dose: new FormControl(),
    administrationRoute: new FormControl(),
    observations: new FormControl(),
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Vaccine>,
    private dialogRef: MatDialogRef<VaccineDialogComponent>,
    private storageService: StorageService,
    private petPageService: PetPageService
  ) { }

  ngOnInit(): void {
    if (this.data.formData) {
      const control = this.data.formData
      const date = moment(control.datetime).toDate()
      const time = convertDateFormat(control.datetime, '', 'hh:mm A')
      const employees = (control.employees as ListResponse<Employee>).data?.[0]?.id
      this.vaccForm.patchValue({ ...this.data.formData, date, time, employees })
    }

    this.loadCurrentVetId()
    this.loadEmployeesFromCurrentVet()
  }

  loadCurrentVetId(){
    this.currentVetId = this.storageService.getCurrentVetId() as number
  }

  loadEmployeesFromCurrentVet(){
    this.petPageService.getVetByIdWithEmployees(this.currentVetId).subscribe(vetRes => {
      const employees = vetRes.employees as ListResponse<Employee>
      this.vetEmployees = employees.data.map(e => ({id: e.id, ...e.attributes}))
    })
  }

  closeDialog(){
    if (!this.vaccForm.valid) return
    const vaccFormValue = this.vaccForm.value
    const date = moment(vaccFormValue.date).startOf('day')
    const time = moment(vaccFormValue.time, 'hh:mm A')
    const datetime = moment(date).add(time.get('h'), 'h')
    datetime.add(time.get('m'), 'm')
    delete vaccFormValue.date
    delete vaccFormValue.time
    const vacc: Vaccine = {
      datetime: datetime.toISOString(),
      ...vaccFormValue
    }
    this.dialogRef.close(vacc)
  }

}
