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
    { title: 'General', icon: 'pets', url: 'general' },
    { title: 'Consulta General', icon: 'healing', url: 'consulta-general' },
    { title: 'Vacunas', icon: 'vaccines', url: 'vacunas' },
    { title: 'Desparasitaciones', icon: 'medication_liquid', url: 'desparasitaciones' },
    { title: 'Hospitalización', icon: 'local_hospital', url: 'hospitalizacion' },
    { title: 'Peluquería', icon: 'content_cut', url: 'peluqueria' },
    { title: 'Hospedaje', icon: 'house', url: 'hospedaje' },
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
        this.pet = petResponse
      },
      error: e => {
        this.location.back()
        this.uiService.openNotificationSnackBar('Mascota inexistente', 'warn')
      }
    })
  }

}
