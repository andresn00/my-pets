import { ComponentType } from '@angular/cdk/portal';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppointmentDialogComponent } from 'src/app/components/petActions/appointment-dialog/appointment-dialog.component';
import { Appointment } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { AppointmentService } from 'src/app/services/collections/petActions/appointment.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { convertDateFormat, FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointmentsDS: MatTableDataSource<Appointment> = new MatTableDataSource()
  displayedColumns = ['datetime', 'status', 'description', 'employee', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  petId!: string
  currentVetId!: number

  convertDateFormat = convertDateFormat

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private storageService: StorageService,
    private uiService: UiService,
    private apptService: AppointmentService
  ) { }

  ngAfterViewInit(){
    this.appointmentsDS.paginator = this.paginator
    this.appointmentsDS.sort = this.sort
  }

  ngOnInit(): void {
    this.currentVetId = this.storageService.getCurrentVetId() as number
    this.petId = this.route.parent?.snapshot.paramMap.get('petId') || ''
    this.fetchAppointments()
  }
  
  fetchAppointments() {
    let params = new HttpParams()
    params = params.appendAll({
      'populate[appointments][populate][0]': 'employees',
    })
  
    this.petService.fetchPetById(+this.petId, params).subscribe(res => {
      const appLR = res.appointments as ListResponse<Appointment>
      this.appointmentsDS.data = appLR.data.map(e => ( {id: e.id, ...e.attributes}))
    })
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
          this.fetchAppointments()
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error creando cita', 'warn')
        }
      })
    })
  }
  
  editAppointment(apptToEdit: Appointment) {
    const data: FormDialogData<Appointment> = {
      title: 'Actualizar Cita',
      formData: apptToEdit
    }
    this.openPetActionDialog(AppointmentDialogComponent, data).subscribe(appt => {
      if (!appt) return
      this.apptService.updateAppointment(<number> apptToEdit.id, { data: appt }).subscribe({
        next: apptRes => {
          this.fetchAppointments()
          this.uiService.openNotificationSnackBar('Cita actualizada', 'primary')
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error actualizando cita', 'warn')
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
