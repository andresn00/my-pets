import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment } from 'src/app/Models/Appointment';
import { Employee } from 'src/app/Models/Employee';
import { AppointmentService } from 'src/app/services/collections/appointment.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { FormDialogData } from 'src/app/utils';
import { AppointmentDialogComponent } from '../../petActions/appointment-dialog/appointment-dialog.component';

interface Action {
  title: string
  icon: string
  bgColor: string
  color: string
  click(): any
}

@Component({
  selector: 'app-pet-actions',
  templateUrl: './pet-actions.component.html',
  styleUrls: ['./pet-actions.component.scss']
})
export class PetActionsComponent implements OnInit {
  @Input() petId!: number | undefined
  @Output() apptCreated = new EventEmitter<Appointment>()

  actions: Action[] = [
    { title: 'Nueva Cita', icon: 'event', bgColor: '#e8e8e8', color: '#444444', 
    click: () => this.newAppointment()},
    { title: 'Nuevo Diagnóstico', icon: 'monitor_heart', bgColor: '#e8e8e8', color: '#444444', 
    click: this.onClick},
    { title: 'Nuevo Control', icon: 'check_circle', bgColor: '#d1e7dd', color: '#008f4e', 
    click: this.onClick},
    { title: 'Nueva Consulta', icon: 'healing', bgColor: '#cfe2ff', color: '#084298',
    click: this.onClick},
    { title: 'Nueva Vacuna', icon: 'vaccines', bgColor: '#f5c2c7', color: '#be0025',
    click: this.onClick},
    { title: 'Nueva Desparasitación', icon: 'medication_liquid', bgColor: '#ffe3c3', color: '#b66200',
    click: this.onClick},
    { title: 'Historial', icon: 'history', bgColor: '#e8e8e8', color: '#444444',
    click: this.onClick},
  ]

  currentVetId!: number

  constructor(
    private apptService: AppointmentService,
    private uiService: UiService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentVetId = this.storageService.getCurrentVetId() as number
  }

  onClick(){
    console.log('onClick')
  }

  newAppointment(){
    const data: FormDialogData = {
      title: 'Nueva Cita'
    }
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {data, panelClass: 'dialog-responsive'})
    dialogRef.afterClosed().subscribe(apptDialog => {
      if (!apptDialog) return
      const {datetime, status, description, employees} = apptDialog
      const newAppt: Appointment = {
        pet: this.petId as number,
        vet: this.currentVetId,
        description,
        datetime,
        status,
        employees,
      }
      console.log('newAppt', newAppt)
      this.apptService.createAppointment(newAppt).subscribe(apptRes => {
        const appt: Appointment = {id: apptRes.data.id, ...apptRes.data.attributes }
        this.uiService.openNotificationSnackBar('Cita creada', 'primary')
        this.apptCreated.emit(appt)
      })
    })
  }

}
