import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Models/PetActions';
import { Customer } from 'src/app/Models/Customer';
import { Employee } from 'src/app/Models/Employee';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { AppointmentService } from 'src/app/services/collections/petActions/appointment.service';
import { PetService } from 'src/app/services/collections/pet.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { getPetSex, getAge, getAgeToString, convertDateFormat } from 'src/app/utils';

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

  currentVetId!: number

  petId!: string
  pet!: Pet
  customer!: Customer
  pendingAppts!: Appointment[]

  constructor(
    private petService: PetService,
    private apptService: AppointmentService,
    private storageService: StorageService,
    private uiService: UiService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('petId') as string
    this.getPet()
    this.getCurrentVetId()
  }

  getCurrentVetId(){
    this.currentVetId = this.storageService.getCurrentVetId() as number
  }

  getPet() {
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'customer',
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
  }

  getPetPendingAppts(){
    this.apptService.fetchPendingApptsFromPetInVet(+this.petId, this.currentVetId).subscribe(apptsLR => {
      this.pendingAppts = apptsLR.data.map(a => {
        return { id: a.id, ...a.attributes };
      });
    })
  }

  addNewPendingAppt(appt: Appointment){
    console.log('addNewPA')
    this.pendingAppts = [...this.pendingAppts, appt]
  }

}
