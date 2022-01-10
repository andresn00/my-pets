import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Customer } from 'src/app/Models/Customer';
import { Pet } from 'src/app/Models/Pet';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { User } from 'src/app/Models/User';
import { CustomerService } from 'src/app/services/collections/customer.service';

@Component({
  selector: 'app-customers-pets',
  templateUrl: './customers-pets.component.html',
  styleUrls: ['./customers-pets.component.scss']
})
export class CustomersPetsComponent implements OnInit {

  customerId!: string
  customer!: SingleResponse<Customer>
  user!: SingleResponse<User>
  pets!: Pet[]

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('customerId') as string
    console.log(`this.customerId`, this.customerId)

    this.getCustomer()
  }

  getCustomer() {
    this.customerService.fetchCustomerById(this.customerId)
      .subscribe(c => {
        this.customer = c
        console.log(`this.customer`, this.customer)
        const pets = c.data.attributes.pets as ListResponse<Pet>
        this.pets = this.spreadPetsAttributes(pets)
        this.user = this.customer.data.attributes.user as SingleResponse<User>
      })
  }
  
  spreadPetsAttributes(pets: ListResponse<Pet>): Pet[] {
    return pets.data.map((p) => {
      return { id: p.id, ...p.attributes}
    })

  }

}
