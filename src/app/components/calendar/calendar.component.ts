import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { MonthViewDay } from 'calendar-utils';
import * as moment from 'moment';
import { Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { Appointment } from 'src/app/Models/Appointment';
import { Employee } from 'src/app/Models/Employee';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { Vet } from 'src/app/Models/Vet';
import { AppointmentService } from 'src/app/services/collections/appointment.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  currentVetId!: number
  apptsEvents: CalendarEvent[] = []
  apptsStartMoment!: moment.Moment
  apptsEndMoment!: moment.Moment

  viewDate = moment().startOf('day').toDate()
  view: CalendarView = CalendarView.Month
  locale: string = 'es'
  viewDateChange: Subject<Date> = new Subject()
  refreshCalendar: Subject<boolean> = new Subject()
  activeDayIsOpen: boolean = false

  constructor(
    private apptService: AppointmentService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getVetId()
    this.getCurrentMonthEvents()
    this.subscribeViewDateChange()
  }
  getVetId() {
    const emp = this.storageService.getCurrentEmployee() as Employee
    const vet = emp.vet as SingleResponse<Vet>
    this.currentVetId = vet.data.id
  }

  getApptsInRange(startDate: string, endDate: string): Observable<ListResponse<Appointment>> {
    console.log('fetched');
    return this.apptService.fetchAppointmentsFromVetInRange(
      this.currentVetId, startDate, endDate
    )
  }

  getCurrentMonthEvents() {
    this.apptsStartMoment = moment().startOf('month')
    this.apptsEndMoment = moment().endOf('month')
    this.getApptsInRange(
      this.apptsStartMoment.toISOString(),
      this.apptsEndMoment.toISOString()
    )
      .subscribe(appts => {
        this.apptsEvents = appts.data.map(a => {
          return this.getEventFromAppt(a);
        })
        console.log('appts', appts);
      })
  }

  subscribeViewDateChange() {
    this.viewDateChange.subscribe(vd => {
      const vdMoment = moment(vd)
      if (vdMoment.isBefore(this.apptsStartMoment)) {
        this.addEventsBefore(vdMoment);
        return
      }
      if (vdMoment.isAfter(this.apptsEndMoment)) {
        this.addEventsAfter(vdMoment);
        return
      }
    })
  }
  
  private addEventsBefore(vdMoment: moment.Moment) {
    const startMom = moment(vdMoment).startOf('month');
    const endMom = moment(vdMoment).endOf('month');
    this.apptsStartMoment = startMom;
    this.getApptsInRange(startMom.toISOString(), endMom.toISOString()).subscribe(appts => {
      const events = appts.data.map(a => {
        return this.getEventFromAppt(a);
      });
      console.log('events', events);
      this.apptsEvents.unshift(...events);
      this.refreshCalendar.next(true)
    });
  }

  private addEventsAfter(vdMoment: moment.Moment) {
    const startMom = moment(vdMoment).startOf('month');
    const endMom = moment(vdMoment).endOf('month');
    this.apptsEndMoment = endMom;
    this.getApptsInRange(startMom.toISOString(), endMom.toISOString()).subscribe(appts => {
      const events = appts.data.map(a => {
        return this.getEventFromAppt(a);
      });
      console.log('events', events);
      this.apptsEvents.push(...events);
      this.refreshCalendar.next(true)
    });
  }
  
  private getEventFromAppt(a: { id: number; attributes: Appointment; }) {
    const title = `${moment(a.attributes.date).format('hh:mm a')} | 
          ${(a.attributes.pet as SingleResponse<Pet>).data.attributes.name}, 
          ${a.attributes.description}`;
    const event: CalendarEvent<Appointment> = {
      id: a.id,
      title,
      start: moment(a.attributes.date).toDate(),
      meta: a.attributes
    };
    return event;
  }

  dayClicked(day: MonthViewDay){
    console.log('day', day);
    this.viewDate = day.date
    if (!day.inMonth){
      this.viewDateChange.next(this.viewDate)
    }
    if (this.activeDayIsOpen){
      this.activeDayIsOpen = false
      return
    }
    const events = day.events
    if (events.length !== 0){
      this.activeDayIsOpen = true
    }
  }

  eventClicked(event: CalendarEvent<Appointment>){
    console.log('event', event);
    const appt = event.meta
    const pet = appt?.pet as SingleResponse<Pet>
    this.router.navigate(['pet', pet.data.id])
  }

}
