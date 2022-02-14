import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import * as moment from 'moment';
import { Appointment } from 'src/app/Models/Appointment';
import { FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {

  showCalendar: boolean = true

  apptForm = new FormGroup({
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData<Appointment>,
    private dialogRef: MatDialogRef<AppointmentDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    if (!this.apptForm.valid) return
    const formValue = this.apptForm.value
    const date = moment(formValue.date).startOf('day')
    const time = moment(formValue.time, 'hh:mm A')
    const datetime = moment(date).add(time.get('h'), 'h')
    datetime.add(time.get('m'), 'm')
    console.log('date', date.toISOString(), time.toISOString())
    console.log('datetime', datetime.toISOString())
    const appt = {
      description: this.apptForm.value.description,
      datetime,
      status: 'pending',
      employees: []
    }
    this.dialogRef.close(appt)
  }

  daySelected(day: CalendarMonthViewDay){
    console.log('day', day)
    this.apptForm.patchValue({
      date: day.date
    })
  }
}
