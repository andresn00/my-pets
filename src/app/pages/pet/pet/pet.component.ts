import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Models/Appointment';
import { Customer } from 'src/app/Models/Customer';
import { Employee } from 'src/app/Models/Employee';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { AppointmentService } from 'src/app/services/collections/appointment.service';
import { PetService } from 'src/app/services/collections/pet.service';
import { UiService } from 'src/app/services/ui.service';
import { getPetSex, getAge, getAgeToString, convertDateFormat } from 'src/app/utils';

interface Action {
  title: string
  icon: string
  bgColor: string
  color: string
  click(): any
}
@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  getPetSex = getPetSex
  getAge = getAge
  getAgeToString = getAgeToString
  convertDateFormat = convertDateFormat

  petId!: string
  pet!: Pet
  customer!: Customer
  pendingAppts!: Appointment[]
  apptsTableCols = ['date', 'time', 'description', 'vet', 'employees', 'actions']

  actions: Action[] = [
    { title: 'Nueva Cita', icon: 'event', bgColor: '#e8e8e8', color: '#444444', 
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

  constructor(
    private petService: PetService,
    private apptService: AppointmentService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('petId') as string
    this.getPet()
  }

  getPet() {
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'customer',
      'filters[appointments][status]': 'pending'
    })
    this.petService.fetchPetById(+this.petId, params).subscribe({
      next: petResponse => {
        this.loadPetData(petResponse);
        this.getPetPendingAppts()
      },
      error: e => {
        this.location.back()
        this.uiService.openNotificationSnackBar('Mascota inexistente', 'warn')
      }
    })
  }

  private loadPetData(petResponse: SingleResponse<Pet>) {
    this.pet = { id: petResponse.data.id, ...petResponse.data.attributes };
    const customer = this.pet.customer as SingleResponse<Customer>;
    this.customer = { id: customer.data.id, ...customer.data.attributes };
    console.log('this.pet', this.pet);
  }

  getPetPendingAppts(){
    this.apptService.fetchPendingAppointmentsFromPet(+this.petId).subscribe(apptsLR => {
      this.pendingAppts = apptsLR.data.map(a => {
        return { id: a.id, ...a.attributes };
      });
      console.log('this.pendingAppts', this.pendingAppts);
    })
  }

  getEmployeesNames(employees: ListResponse<Employee>){
    return employees.data.map(e => e.attributes.name).join('')
  }

  markApptAsCompleted(appt: Appointment){
    this.apptService.updateAppointmentStatus(appt.id as number, 'completed').subscribe({
      next: res => {
        this.pendingAppts = this.pendingAppts.filter(a => a.id !== appt.id)
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
        this.pendingAppts = this.pendingAppts.filter(a => a.id !== appt.id)
        this.uiService.openNotificationSnackBar('Cita cancelada', 'accent')
      },
      error: e => {
        this.uiService.openNotificationSnackBar('Error actualizando cita', 'warn')
      }
    })
  }

  onClick(){
    console.log('click');
  }
}
