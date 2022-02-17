import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { Session } from 'src/app/Models/Session';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import * as moment from 'moment'
import { AppointmentService } from 'src/app/services/collections/petActions/appointment.service';
import { Vet } from 'src/app/Models/Vet';
import { Appointment } from 'src/app/Models/PetActions';
import { CalendarEvent } from 'angular-calendar';
import { Pet } from 'src/app/Models/Pet';

interface Card {
  title: string
  icon: string
  bgColor: string
  color: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  url: string = 'dashboard'

  cards: Card[] = [
    { title: 'Citas para hoy', icon: 'date_range', bgColor: '#d1e7dd', color: '#008f4e' },
    { title: 'Peluquerías activas', icon: 'content_cut', bgColor: '#ffe3c3', color: '#b66200' },
    { title: 'Hospitalizaciones activas', icon: 'local_hospital', bgColor: '#f5c2c7', color: '#be0025' },
    { title: 'Hospedajes activos', icon: 'house', bgColor: '#cfe2ff', color: '#084298' },
  ]

  employeeLoged!: Employee
  todaysAppts!: Appointment[]
  todaysEvents: CalendarEvent[] = []

  constructor(
    private appointmentService: AppointmentService,
    private storageService: StorageService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.employeeLoged = this.storageService.getCurrentEmployee() as Employee
    this.getAppointmentsForToday()
  }

  getAppointmentsForToday() {
    const vet = this.employeeLoged.vet as SingleResponse<Vet>
    const vetId = vet.data.id
    const today = moment().startOf('day').toISOString()
    const tomorrow = moment().endOf('day').toISOString()
    this.appointmentService.fetchPendingApptsFromVetInRange(vetId, today, tomorrow).subscribe(todaysAppts => {
      this.todaysAppts = todaysAppts
      this.todaysEvents = todaysAppts.map(a => {
        const title = `${moment(a.datetime).format('hh:mm a')} | 
        ${(a.pet as SingleResponse<Pet>).data.attributes.name}, 
        ${a.description}`
        const event: CalendarEvent = {
          id: a.id,
          title,
          start: moment(a.datetime).toDate()
        }
        return event
      })
    })
  }

}
