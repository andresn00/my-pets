import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { convertDateFormat } from 'src/app/utils';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  appointmentsDS: MatTableDataSource<Appointment> = new MatTableDataSource()
  displayedColumns = ['datetime', 'status', 'description', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  petId!: string

  convertDateFormat = convertDateFormat

  constructor(
    private petService: PetService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(){
    this.appointmentsDS.paginator = this.paginator
    this.appointmentsDS.sort = this.sort
  }

  ngOnInit(): void {
    console.log('this.route.snapshot', this.route.snapshot)
    this.petId = this.route.parent?.snapshot.paramMap.get('petId') || ''
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'appointments',
    })

    this.petService.fetchPetById(+this.petId, params).subscribe(res => {
      const appLR = res.appointments as ListResponse<Appointment>
      this.appointmentsDS.data = appLR.data.map(e => ( {id: e.id, ...e.attributes}))
    })
  }
  
  onNew() {
    
  }

}
