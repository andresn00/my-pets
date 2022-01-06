import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { Session } from 'src/app/Models/Session';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';

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
    { title: 'Peluquerías activas', icon: 'pets', bgColor: '#ffe3c3', color: '#b66200' },
    { title: 'Hospitalizaciones activas', icon: 'local_hospital', bgColor: '#f5c2c7', color: '#be0025' },
    { title: 'Hospedajes activos', icon: 'location_city', bgColor: '#cfe2ff', color: '#084298' },
  ]
  constructor(
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }

}
