import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import * as moment from 'moment'

@Component({
  selector: 'app-pet-general',
  templateUrl: './pet-general.component.html',
  styleUrls: ['./pet-general.component.scss']
})
export class PetGeneralComponent implements OnInit {
 viewDate = new Date()
 events: CalendarEvent[] = [
   {
     title: 'Test',
     start: new Date(),
   },
   {
     title: 'Test 2',
     start: moment('20/01/2022', 'DD/MM/YYYY').toDate()
   }
 ]
  constructor() { }

  ngOnInit(): void {
  }

}
