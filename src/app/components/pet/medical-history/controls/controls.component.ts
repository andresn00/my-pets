import { ComponentType } from '@angular/cdk/portal';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ControlDialogComponent } from 'src/app/components/petActions/control-dialog/control-dialog.component';
import { Control } from 'src/app/Models/PetActions';
import { ListResponse } from 'src/app/Models/RestObjects';
import { PetService } from 'src/app/services/collections/pet.service';
import { ControlService } from 'src/app/services/collections/petActions/control.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { convertDateFormat, FormDialogData } from 'src/app/utils';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  controlsDS: MatTableDataSource<Control> = new MatTableDataSource()
  displayedColumns = ['datetime', 'weight', 'temperature', 'employee', 'actions']
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
    private controlService: ControlService
  ) { }

  ngAfterViewInit(){
    this.controlsDS.paginator = this.paginator
    this.controlsDS.sort = this.sort
  }

  ngOnInit(): void {
    this.currentVetId = this.storageService.getCurrentVetId() as number
    this.petId = this.route.parent?.snapshot.paramMap.get('petId') || ''
    this.fetchControls();
  }

  fetchControls() {
    let params = new HttpParams();
    params = params.appendAll({
      'populate[controls][populate][0]': 'employees',
    });

    this.petService.fetchPetById(+this.petId, params).subscribe(res => {
      const controlLR = res.controls as ListResponse<Control>;
      this.controlsDS.data = controlLR.data.map(e => ({ id: e.id, ...e.attributes }));
    });
  }

  newControl() {
    const data: FormDialogData<Control> = {
      title: 'Nuevo Control',
    }
    this.openPetActionDialog(ControlDialogComponent, data).subscribe((control: Control) => {
      if (!control) return
      this.controlService.createControl(control).subscribe({
        next: controlRes => {
          this.uiService.openNotificationSnackBar('Control agregado', 'primary')
          this.controlsDS.data = [controlRes, ...this.controlsDS.data]
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error creando control', 'warn')
        }
      })
    })
  }

  editControl(controlToEdit: Control) {
    const data: FormDialogData<Control> = {
      title: 'Actualizar Control',
      formData: controlToEdit
    }
    this.openPetActionDialog(ControlDialogComponent, data).subscribe((control: Control) => {
      if (!control) return
      this.controlService.updateControl(controlToEdit.id as number, control).subscribe({
        next: controlRes => {
          this.uiService.openNotificationSnackBar('Control actualizado', 'primary')
          this.fetchControls()
        },
        error: e => {
          this.uiService.openNotificationSnackBar('Error actualizando control', 'warn')
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
