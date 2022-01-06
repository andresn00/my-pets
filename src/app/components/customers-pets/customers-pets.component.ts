import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-customers-pets',
  templateUrl: './customers-pets.component.html',
  styleUrls: ['./customers-pets.component.scss']
})
export class CustomersPetsComponent implements OnInit {

  userId!: string | null
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId =  this.route.snapshot.paramMap.get('userId')
    console.log(`this.userId`, this.userId)
  }

}
