import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-history',
  templateUrl: './pet-history.component.html',
  styleUrls: ['./pet-history.component.scss']
})
export class PetHistoryComponent implements OnInit {

  options = [
    // { title: 'General', icon: 'pets', url: 'general' },
    { title: 'Consulta General', icon: 'healing', url: 'consulta-general' },
    { title: 'Vacunas', icon: 'vaccines', url: 'vacunas' },
    { title: 'Desparasitaciones', icon: 'medication_liquid', url: 'desparasitaciones' },
    { title: 'Hospitalización', icon: 'local_hospital', url: 'hospitalizacion' },
    { title: 'Peluquería', icon: 'content_cut', url: 'peluqueria' },
    { title: 'Hospedaje', icon: 'house', url: 'hospedaje' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
