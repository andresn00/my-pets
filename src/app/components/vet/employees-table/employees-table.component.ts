import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/Models/Employee';
import { FormDialogData } from 'src/app/utils';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  @Input() employeesDS: MatTableDataSource<Employee> = new MatTableDataSource()
  displayedColumns = ['name', 'ci', 'phone', 'address']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.employeesDS.paginator = this.paginator
    this.employeesDS.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesDS.filter = filterValue.trim().toLowerCase();

    if (this.employeesDS.paginator) {
      this.employeesDS.paginator.firstPage();
    }
  }

  createEmployee(){
    const data: FormDialogData<any> = {
      title: 'Nuevo Empleado'
    }
    const panelClass = 'dialog-responsive'
    const dialogRef = this.dialog.open(EmployeeDialogComponent, { data, panelClass})
    dialogRef.afterClosed().subscribe(res => {
      console.log('res', res)
    })
  }
}
