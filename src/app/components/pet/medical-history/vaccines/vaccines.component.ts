import { ComponentType } from '@angular/cdk/portal';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { VaccineDialogComponent } from 'src/app/components/petActions/vaccine-dialog/vaccine-dialog.component';
import { Vaccine } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { VaccineService } from 'src/app/services/collections/petActions/vaccine.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { convertDateFormat, FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.scss']
})
export class VaccinesComponent implements OnInit {
  vaccinesDS: MatTableDataSource<Vaccine> = new MatTableDataSource()
  displayedColumns = ['datetime', 'type', 'dose', 'administrationRoute', 'observations', 'employee', 'actions']
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  petId!: string
  currentVetId!: number

  convertDateFormat = convertDateFormat

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private storageService: StorageService,
    private uiService: UiService,
    private vaccineService: VaccineService
  ) { }

  ngAfterViewInit(){
    this.vaccinesDS.paginator = this.paginator
    this.vaccinesDS.sort = this.sort
  }

  ngOnInit(): void {
    this.currentVetId = this.storageService.getCurrentVetId() as number
    this.petId = this.route.parent?.snapshot.paramMap.get('petId') || ''
    this.fetchVaccines();
  }

  fetchVaccines() {
    let params = new HttpParams();
    params = params.appendAll({
      'populate[vaccines][populate][0]': 'employees',
    });

    this.petService.fetchPetById(+this.petId, params).subscribe(res => {
      const vaccLS = res.vaccines as ListResponse<Vaccine>;
      this.vaccinesDS.data = vaccLS.data.map(e => ({ id: e.id, ...e.attributes }));
    });
  }

  newVaccine() {
    const data: FormDialogData<Vaccine> = {
      title: 'Nueva Vacuna',
    }
    this.openPetActionDialog(VaccineDialogComponent, data).subscribe((vacc: Vaccine) => {
      if (!vacc) return
      this.vaccineService.createVaccine(vacc).subscribe({
        next: vaccRes => {
          this.uiService.openNotificationSnackBar('Vacuna agregada', 'primary')
          this.fetchVaccines()
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error creando vacuna', 'warn')
        }
      })
    })
  }

  editVaccine(vaccToEdit: Vaccine) {
    const data: FormDialogData<Vaccine> = {
      title: 'Actualizar Vacuna',
      formData: vaccToEdit
    }
    this.openPetActionDialog(VaccineDialogComponent, data).subscribe((vacc: Vaccine) => {
      if (!vacc) return
      this.vaccineService.updateVaccine(vaccToEdit.id as number, vacc).subscribe({
        next: vaccRes => {
          this.uiService.openNotificationSnackBar('Vacuna actualizada', 'primary')
          this.fetchVaccines()
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error actualizando vacuna', 'warn')
        }
      })
    })
  }
  
  openPetActionDialog(petAction: ComponentType<unknown>, data: FormDialogData<any>,
    panelClass = 'dialog-responsive'): Observable<any> {
    const dialogRef = this.dialog.open(petAction, { data, panelClass })
    return dialogRef.afterClosed().pipe(map(formDialogData => {
      if (!formDialogData) return null
      formDialogData.pet = this.petId
      formDialogData.vet = this.currentVetId
      return formDialogData
    }))
  }

}
