import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { Appointment } from 'src/app/Models/PetActions';
import { Pet } from 'src/app/Models/Pet';
import { SingleResponse } from 'src/app/Models/RestObjects';

@Component({
  selector: 'app-calendar-home',
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  eventClicked(event: CalendarEvent<Appointment>){
    const appt = event.meta
    const pet = appt?.pet as SingleResponse<Pet>
    this.router.navigate(['pet', pet.data.id])
  }

}
