import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Appointment, Control, Vaccine } from 'src/app/Models/PetActions';
import { Employee } from 'src/app/Models/Employee';
import { AppointmentService } from 'src/app/services/collections/petActions/appointment.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { FormDialogData } from 'src/app/utils';
import { AppointmentDialogComponent } from '../../petActions/appointment-dialog/appointment-dialog.component';
import { ControlDialogComponent } from '../../petActions/control-dialog/control-dialog.component';
import { ControlService } from 'src/app/services/collections/petActions/control.service';
import { VaccineDialogComponent } from '../../petActions/vaccine-dialog/vaccine-dialog.component';
import { map, Observable, of } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';
import { VaccineService } from 'src/app/services/collections/petActions/vaccine.service';

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
    {
      title: 'Nueva Cita', icon: 'event', bgColor: '#e8e8e8', color: '#444444',
      click: () => this.newAppointment()
    },
    {
      title: 'Nuevo Diagnóstico', icon: 'monitor_heart', bgColor: '#e8e8e8', color: '#444444',
      click: () => this.onClick()
    },
    {
      title: 'Nuevo Control', icon: 'check_circle', bgColor: '#d1e7dd', color: '#008f4e',
      click: () => this.newControl()
    },
    {
      title: 'Nueva Consulta', icon: 'healing', bgColor: '#cfe2ff', color: '#084298',
      click: this.onClick
    },
    {
      title: 'Nueva Vacuna', icon: 'vaccines', bgColor: '#f5c2c7', color: '#be0025',
      click: () => this.newVaccine()
    },
    {
      title: 'Nueva Desparasitación', icon: 'medication_liquid', bgColor: '#ffe3c3', color: '#b66200',
      click: this.onClick
    },
    {
      title: 'Historial', icon: 'history', bgColor: '#e8e8e8', color: '#444444',
      click: this.onClick
    },
  ]

  currentVetId!: number

  constructor(
    private apptService: AppointmentService,
    private controlService: ControlService,
    private vaccineService: VaccineService,
    private uiService: UiService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentVetId = this.storageService.getCurrentVetId() as number
  }

  onClick() {
    console.log('onClick')
  }

  newAppointment() {
    const data: FormDialogData = {
      title: 'Nueva Cita'
    }
    this.openPetActionDialog(AppointmentDialogComponent, data).subscribe(appt => {
      if (!appt) return
      this.apptService.createAppointment(appt).subscribe({
        next: apptRes => {
          const appt: Appointment = { id: apptRes.data.id, ...apptRes.data.attributes }
          this.uiService.openNotificationSnackBar('Cita creada', 'primary')
          this.apptCreated.emit(appt)
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error creando cita', 'warn')
        }
      })
    })
  }

  newControl() {
    const data: FormDialogData<Control> = {
      title: 'Nuevo Control',
    }
    this.openPetActionDialog(ControlDialogComponent, data).subscribe((control: Control) => {
      if (!control) return
      this.controlService.createControl(control).subscribe({
        next: controlRes => {
          this.uiService.openNotificationSnackBar('Control agregado', 'primary')
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error creando control', 'warn')
        }
      })
    })
  }

  newVaccine() {
    const data: FormDialogData<Vaccine> = {
      title: 'Nueva Vacuna',
    }
    this.openPetActionDialog(VaccineDialogComponent, data).subscribe(vacc => {
      if (!vacc) return
      console.log('vacc', vacc)
      this.vaccineService.createVaccine(vacc).subscribe({
        next: vaccRes => {
          this.uiService.openNotificationSnackBar('Vacuna agregada', 'primary')
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error creando vacuna', 'warn')
        }
      })
    })
  }

  openPetActionDialog(petAction: ComponentType<unknown>, data: FormDialogData<any>,
    panelClass = 'dialog-responsive'): Observable<any> {
    const dialogRef = this.dialog.open(petAction, { data, panelClass })
    return dialogRef.afterClosed().pipe(map(formDialogData => {
      if (!formDialogData) return null
      formDialogData.pet = this.petId
      formDialogData.vet = this.currentVetId
      return formDialogData
    }))
  }

}
