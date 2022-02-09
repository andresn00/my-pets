import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    console.log('onClick')
  }

}
