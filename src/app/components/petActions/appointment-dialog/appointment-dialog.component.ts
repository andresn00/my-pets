import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import * as moment from 'moment';
import { Appointment } from 'src/app/Models/PetActions';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { VetService } from 'src/app/services/collections/vet.service';
import { PetPageService } from 'src/app/services/pet-page.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { convertDateFormat, FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {
console = console
  currentVetId!: number
  vetEmployees!: Employee[]
  showCalendar: boolean = true

  apptForm = new FormGroup({
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    employees: new FormControl()
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Appointment>,
    private dialogRef: MatDialogRef<AppointmentDialogComponent>,
    private storageService: StorageService,
    private petPageService: PetPageService
  ) { }

  ngOnInit(): void {
    if (this.data.formData) {
      const appt = this.data.formData
      const date = moment(appt.datetime).toDate()
      const time = convertDateFormat(appt.datetime, '', 'hh:mm A')
      const employees = (appt.employees as ListResponse<Employee>).data?.[0]?.id
      this.apptForm.patchValue({ ...this.data.formData, date, time, employees })
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
    if (!this.apptForm.valid) return
    const formValue = this.apptForm.value
    const date = moment(formValue.date).startOf('day')
    const time = moment(formValue.time, 'hh:mm A')
    const datetime = moment(date).add(time.get('h'), 'h')
    datetime.add(time.get('m'), 'm')
    const appt = {
      description: formValue.description,
      datetime,
      status: 'pending',
      employees: formValue.employees
    }
    this.dialogRef.close(appt)
  }

  daySelected(day: CalendarMonthViewDay){
    this.apptForm.patchValue({
      date: day.date
    })
  }
}
