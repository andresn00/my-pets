import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { Vet } from 'src/app/Models/Vet';
import { VetService } from 'src/app/services/collections/vet.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-vet',
  templateUrl: './vet.component.html',
  styleUrls: ['./vet.component.scss']
})
export class VetComponent implements OnInit {
  vetId!: number
  vet!: Vet

  employeesDS: MatTableDataSource<Employee> = new MatTableDataSource()
  displayedColumns = ['name', 'ci', 'phone', 'address']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vetService: VetService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.getCurrentVetId()
    this.loadCurrentVet()
  }

  ngAfterViewInit(){
    this.employeesDS.paginator = this.paginator
    this.employeesDS.sort = this.sort
  }

  getCurrentVetId(){
    this.vetId = this.storageService.getCurrentVetId() as number
  }

  loadCurrentVet(){
    this.vetService.fetchVetById(this.vetId, 'employees').subscribe(vet => {
      this.vet = vet
      const empLR = vet.employees as ListResponse<Employee>
      this.employeesDS.data = empLR.data.map(e => ( {id: e.id, ...e.attributes}))
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesDS.filter = filterValue.trim().toLowerCase();

    if (this.employeesDS.paginator) {
      this.employeesDS.paginator.firstPage();
    }
  }


}
