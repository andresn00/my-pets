import { Component, OnInit, Input } from '@angular/core';
import { Pet } from 'src/app/Models/Pet';

@Component({
  selector: 'app-pets-card',
  templateUrl: './pets-card.component.html',
  styleUrls: ['./pets-card.component.scss']
})
export class PetsCardComponent implements OnInit {

  @Input() pet!: Pet

  constructor() { }

  ngOnInit(): void {
  }

}
