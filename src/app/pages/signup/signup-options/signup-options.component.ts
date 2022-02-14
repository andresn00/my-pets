import { Component, OnInit } from '@angular/core';

interface Card {
  link: string
  title: string
  icon: string
  bgColor: string
  color: string
}
@Component({
  selector: 'app-signup-options',
  templateUrl: './signup-options.component.html',
  styleUrls: ['./signup-options.component.scss']
})
export class SignupOptionsComponent implements OnInit {

  cards: Card[] = [
    // {link: '../owner', title: 'Dueño de mascota', icon: 'pets', bgColor: '#ffe3c3', color: '#b66200' },
    { link: '../owner', title: 'Dueño de mascota', icon: 'pets', bgColor: '#cfe2ff', color: '#084298' },
    {link: '../vet', title: 'Veterinaria', icon: 'local_hospital', bgColor: '#f5c2c7', color: '#be0025' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
