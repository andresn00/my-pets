import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Models/Appointment';
import { Customer } from 'src/app/Models/Customer';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
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
  appts!: Appointment[]

  actions: Action[] = [
    { title: 'Nuevo Control', icon: 'check_circle', bgColor: '#d1e7dd', color: '#008f4e', 
    click: () => {this.onClick()}},
    { title: 'Nueva Consulta', icon: 'healing', bgColor: '#cfe2ff', color: '#084298',
    click: () => {this.onClick()}},
    { title: 'Nueva Vacuna', icon: 'vaccines', bgColor: '#f5c2c7', color: '#be0025',
    click: () => {this.onClick()}},
    { title: 'Nueva Desparasitación', icon: 'medication_liquid', bgColor: '#ffe3c3', color: '#b66200',
    click: () => {this.onClick()}},
  ]

  constructor(
    private petService: PetService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('petId') as string
    this.getPet()
  }

  getPet() {
    this.petService.fetchPetById(+this.petId, '*').subscribe({
      next: petResponse => {
        this.pet = {id: petResponse.data.id, ...petResponse.data.attributes}
        const customer = this.pet.customer as SingleResponse<Customer>
        this.customer = {id: customer.data.id, ...customer.data.attributes}
        const appts = this.pet.appointments as ListResponse<Appointment>
        this.appts = appts.data.map(a => {
          return {id: a.id, ...a.attributes}
        })
        console.log('this.pet', this.pet);
      },
      error: e => {
        this.location.back()
        this.uiService.openNotificationSnackBar('Mascota inexistente', 'warn')
      }
    })
  }

  onClick(){
    console.log('click');
  }
}
