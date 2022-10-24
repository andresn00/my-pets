import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Control } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { convertDateFormat } from 'src/app/utils';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  controlsDS: MatTableDataSource<Control> = new MatTableDataSource()
  displayedColumns = ['datetime', 'weight', 'temperature', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  petId!: string

  convertDateFormat = convertDateFormat

  constructor(
    private petService: PetService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(){
    this.controlsDS.paginator = this.paginator
    this.controlsDS.sort = this.sort
  }

  ngOnInit(): void {
    console.log('this.route.snapshot', this.route.snapshot)
    this.petId = this.route.parent?.snapshot.paramMap.get('petId') || ''
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'controls',
    })

    this.petService.fetchPetById(+this.petId, params).subscribe(res => {
      const controlLR = res.controls as ListResponse<Control>
      this.controlsDS.data = controlLR.data.map(e => ( {id: e.id, ...e.attributes}))
    })
  }

  onNew() {
    
  }

}
