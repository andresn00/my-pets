import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/Models/Pet';
import { getPetSex, getAge, getAgeToString } from 'src/app/utils';

@Component({
  selector: 'app-pets-card',
  templateUrl: './pets-card.component.html',
  styleUrls: ['./pets-card.component.scss']
})
export class PetsCardComponent implements OnInit {
  @Input() pet!: Pet
  @Output() editPet = new EventEmitter<Pet>()
  @Output() deletePet = new EventEmitter<number>()
  
  showActions = false
  // defaultImg: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg'
  defaultImg: string = 'https://image.shutterstock.com/image-vector/simple-line-icon-design-puppy-260nw-1242003667.jpg'
  
  getPetSex = getPetSex
  getAge = getAge
  getAgeToString = getAgeToString

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(){
    this.editPet.emit(this.pet)
  }
  onDelete(){
    this.deletePet.emit(this.pet.id)
  }
  onKeyDown(){
    console.log('keyDown');
  }
}
