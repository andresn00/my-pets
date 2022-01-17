import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/Models/Pet';
import { SingleResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  
  petId!: string
  pet!: SingleResponse<Pet>

  options = [
    { title: 'General', icon: 'pets' },
    { title: 'Consulta General', icon: 'healing' },
    { title: 'Vacunas', icon: 'vaccines' },
    { title: 'Desparasitaciones', icon: 'medication_liquid' },
    { title: 'Hospitalización', icon: 'local_hospital' },
    { title: 'Peluquería', icon: 'content_cut' },
    { title: 'Hospedaje', icon: 'house' },
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
    this.petService.fetchVetById(+this.petId, '*').subscribe({
      next: petResponse => {
        this.pet = petResponse
      },
      error: e => {
        this.location.back()
        this.uiService.openNotificationSnackBar('Mascota inexistente', 'warn')
      }
    })
  }

}
