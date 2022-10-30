import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/Models/PetActions';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { AppointmentService } from 'src/app/services/collections/petActions/appointment.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { convertDateFormat } from 'src/app/utils';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-pet-pending-appts-table',
  templateUrl: './pet-pending-appts-table.component.html',
  styleUrls: ['./pet-pending-appts-table.component.scss']
})
export class PetPendingApptsTableComponent implements OnInit {
  convertDateFormat = convertDateFormat

  @Input() pendingApptsDS: MatTableDataSource<Appointment> = new MatTableDataSource()
  apptsTableCols = ['date', 'time', 'description', 'employees', 'actions']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apptService: AppointmentService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit(){
    this.pendingApptsDS.paginator = this.paginator
    this.pendingApptsDS.sort = this.sort
  }

  getEmployeesNames(employees: ListResponse<Employee>){
    return employees.data.map(e => e.attributes.name).join('')
  }

  markApptAsCompleted(appt: Appointment){
    this.apptService.updateAppointmentStatus(appt.id as number, 'completed').subscribe({
      next: res => {
        this.pendingApptsDS.data = this.pendingApptsDS.data.filter(a => a.id !== appt.id)
        this.uiService.openNotificationSnackBar('Cita completada', 'primary')
      },
      error: e => {
        this.uiService.openNotificationSnackBar('Error actualizando cita', 'warn')
      }
    })
  }
  markApptAsCanceled(appt: Appointment){
    this.apptService.updateAppointmentStatus(appt.id as number, 'canceled').subscribe({
      next: res => {
        this.pendingApptsDS.data = this.pendingApptsDS.data.filter(a => a.id !== appt.id)
        this.uiService.openNotificationSnackBar('Cita cancelada', 'accent')
      },
      error: e => {
        this.uiService.openNotificationSnackBar('Error actualizando cita', 'warn')
      }
    })
  }


}
