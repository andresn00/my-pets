import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditVetDialogComponent } from 'src/app/components/vet/edit-vet-dialog/edit-vet-dialog.component';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { User } from 'src/app/Models/User';
import { Vet } from 'src/app/Models/Vet';
import { VetService } from 'src/app/services/collections/vet.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-vet',
  templateUrl: './vet.component.html',
  styleUrls: ['./vet.component.scss']
})
export class VetComponent implements OnInit {
  vetId!: number
  vet!: Vet

  user!: User

  employeesDS: MatTableDataSource<Employee> = new MatTableDataSource()
  displayedColumns = ['name', 'ci', 'phone', 'address']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vetService: VetService,
    private storageService: StorageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCurrentVetId()
    this.loadCurrentVet()
    this.loadUser()
  }
  loadUser() {
    this.user = this.storageService.getCurrentSession()?.user as User
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

  onVetEdit() {
    const data: FormDialogData<Vet> = {
      formData: this.vet
    }
    this.dialog.open(EditVetDialogComponent, { data, minWidth: '50%', maxWidth: '90vw' })
      .afterClosed().subscribe((res: Vet) => {
        this.vet = { ...this.vet, ...res }
      })
  }

}
