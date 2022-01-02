import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Models/Customer';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { Vet } from 'src/app/Models/Vet';
import { VetService } from 'src/app/services/collections/vet.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-users',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  currentVetId!: number
  customers!: Customer[]
  customersDataSource: MatTableDataSource<Customer> = new MatTableDataSource()
  displayedColumns: string[] = ['name', 'ci', 'phone', 'address']


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private storageService: StorageService,
    private vetService: VetService
  ) { }

  ngOnInit(): void {
    this.loadVetId()
    if (this.currentVetId) {
      this.getCustomersByVetId()
    }
  }
  ngAfterViewInit(){
    this.customersDataSource.paginator = this.paginator
    this.customersDataSource.sort = this.sort
  }

  private loadVetId() {
    const currentEmployee: ListResponse<Employee> = <ListResponse<Employee>>this.storageService.getCurrentEmployee();
    const currentVet: SingleResponse<Vet> = <SingleResponse<Vet>>currentEmployee.data[0].attributes.vet;
    this.currentVetId = currentVet?.data.id;
  }

  private getCustomersByVetId() {
    this.vetService.fetchVetById(this.currentVetId, 'customers')
      .subscribe((vet: SingleResponse<Vet>) => {
        const custResponse = <ListResponse<Customer>> vet.data.attributes.customers
        this.customers = custResponse.data.map(c => {
          return { id: c.id, ...c.attributes}
        })
        console.log(`customers`, this.customers)
        this.customersDataSource = new MatTableDataSource(this.customers)
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.customersDataSource.paginator) {
      this.customersDataSource.paginator.firstPage();
    }
  }
}
