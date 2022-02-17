import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/Models/Customer';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';
import { Vet } from 'src/app/Models/Vet';
import { VetService } from 'src/app/services/collections/vet.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { SignupOwnerDialogComponent } from '../../../components/signup/signup-owner-dialog/signup-owner-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  url: string = 'customers'
  currentVetId!: number
  customersDataSource: MatTableDataSource<Customer> = new MatTableDataSource()
  displayedColumns: string[] = ['name', 'ci', 'phone', 'address']


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private storageService: StorageService,
    private vetService: VetService,
    private uiService: UiService,
    private dialog: MatDialog
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
    const currentEmployee: Employee = <Employee> this.storageService.getCurrentEmployee();
    const currentVet: SingleResponse<Vet> = <SingleResponse<Vet>>currentEmployee.vet;
    this.currentVetId = currentVet?.data.id;
  }

  private getCustomersByVetId() {
    this.vetService.fetchVetById(this.currentVetId, 'customers')
      .subscribe(vet => {
        const custResponse = <ListResponse<Customer>> vet.customers
        const customers = custResponse.data.map(c => {
          return { id: c.id, ...c.attributes}
        })
        this.customersDataSource.data = customers
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.customersDataSource.paginator) {
      this.customersDataSource.paginator.firstPage();
    }
  }

  openCreateCustomerDialog(){
    const data = {
      vetId: this.currentVetId
    }
    const dialogRef = this.dialog.open(SignupOwnerDialogComponent, {data, minWidth: '50%', maxWidth: '90%'})
    dialogRef.afterClosed().subscribe(() => {
      this.getCustomersByVetId()
    })
  }
}
