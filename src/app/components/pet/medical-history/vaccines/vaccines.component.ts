import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Vaccine } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { convertDateFormat } from 'src/app/utils';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss']
})
export class VaccinesComponent implements OnInit {
  vaccinesDS: MatTableDataSource<Vaccine> = new MatTableDataSource()
  displayedColumns = ['datetime', 'type', 'dose', 'administrationRoute', 'observations', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  petId!: string

  convertDateFormat = convertDateFormat

  constructor(
    private petService: PetService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(){
    this.vaccinesDS.paginator = this.paginator
    this.vaccinesDS.sort = this.sort
  }

  ngOnInit(): void {
    console.log('this.route.snapshot', this.route.snapshot)
    this.petId = this.route.parent?.snapshot.paramMap.get('petId') || ''
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'vaccines',
    })

    this.petService.fetchPetById(+this.petId, params).subscribe(res => {
      const vaccLS = res.vaccines as ListResponse<Vaccine>
      this.vaccinesDS.data = vaccLS.data.map(e => ( {id: e.id, ...e.attributes}))
    })
  }

  onNew() {

  }
  
}
