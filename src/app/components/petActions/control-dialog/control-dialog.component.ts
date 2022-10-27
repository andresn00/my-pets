import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Appointment, Control } from 'src/app/Models/PetActions';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetPageService } from 'src/app/services/pet-page.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { convertDateFormat, FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-control-dialog',
  templateUrl: './control-dialog.component.html',
  styleUrls: ['./control-dialog.component.scss']
})
export class ControlDialogComponent implements OnInit {

  currentVetId!: number
  vetEmployees!: Employee[]

  controlForm = new FormGroup({
    date: new FormControl(moment().toDate(), Validators.required),
    time: new FormControl(moment().format('hh:mm A'), Validators.required),
    weight: new FormControl('', Validators.required),
    weightUnit: new FormControl('kg', Validators.required),
    temperature: new FormControl('', Validators.required),
    temperatureUnit: new FormControl('deg', Validators.required),
    employees: new FormControl('', Validators.required),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Control>,
    private dialogRef: MatDialogRef<ControlDialogComponent>,
    private storageService: StorageService,
    private petPageService: PetPageService
  ) { }

  ngOnInit(): void {
    if (this.data.formData) {
      const control = this.data.formData
      const date = moment(control.datetime).toDate()
      const time = convertDateFormat(control.datetime, '', 'hh:mm A')
      const employees = (control.employees as ListResponse<Employee>).data?.[0]?.id
      const weight = control.weight.replace(/\D+/, '')
      const weightUnit = control.weight.replace(/\d+/, '')
      const temperature = control.temperature.replace(/\D+/, '')
      const temperatureUnit = control.temperature.replace(/\d+/, '')
      this.controlForm.patchValue({ ...this.data.formData, 
        date, time, employees, weight, weightUnit, temperature, temperatureUnit })
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
    if (!this.controlForm.valid) return
    const controlFormValue = this.controlForm.value
    const date = moment(controlFormValue.date).startOf('day')
    const time = moment(controlFormValue.time, 'hh:mm A')
    const datetime = moment(date).add(time.get('h'), 'h')
    datetime.add(time.get('m'), 'm')
    const control: Control = {
      datetime: datetime.toISOString(),
      weight: `${controlFormValue.weight}${controlFormValue.weightUnit}`,
      temperature: `${controlFormValue.temperature}${controlFormValue.temperatureUnit}`,
      employees: controlFormValue.employees
    }
    this.dialogRef.close(control)
  }


}
