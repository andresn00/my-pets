import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/Models/Employee';
import { User } from 'src/app/Models/User';
import { SignupService } from 'src/app/services/auth/signup.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UiService } from 'src/app/services/ui/ui.service';
import { FormDialogData } from 'src/app/utils';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss']
})
export class EmployeesTableComponent implements OnInit {
  @Input() employeesDS: MatTableDataSource<Employee> = new MatTableDataSource()
  displayedColumns = ['name', 'ci', 'phone', 'address', 'actions']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private signupService: SignupService,
    private uiService: UiService,
    private storageService: StorageService
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

  openCreateEmployeeDialog(formData?: any){
    const data: FormDialogData<any> = {
      title: 'Nuevo Empleado',
      formData
    }
    const panelClass = 'dialog-responsive'
    const dialogRef = this.dialog.open(EmployeeDialogComponent, { data, panelClass})
    dialogRef.afterClosed().subscribe(res => {
      this.createEmployee(res);
    })
  }

  private createEmployee(res: any) {
    console.log('res', res);
    if (!res) return
    const user: User = res.user;
    const employee: Employee = res.employee;
    employee.vet = this.storageService.getCurrentVetId();
    this.signupService.registerUser(user).subscribe({
      next: userSession => {
        employee.user = userSession.user.id;
        this.signupService.registerEmployee(employee).subscribe({
          next: empRes => {
            this.employeesDS.data = [...this.employeesDS.data, empRes]
            this.uiService.openNotificationSnackBar('Empleado creado', 'primary');
          },
          error: err => {
            this.signupService.rollbackUser(userSession.user.id).subscribe();
            const errMessage = err.status === 400 ? 'Empleado existente' : 'Error creando registro';
            this.uiService.openNotificationSnackBar(errMessage, 'warn');
            const formData = { user, employee }
            this.openCreateEmployeeDialog(formData)
          }
        });
      },
      error: err => {
        const errMessage = err.status === 400 ? 'Email o usuario en uso' : 'Error creando registro';
        this.uiService.openNotificationSnackBar(errMessage, 'warn');
        const formData = { user, employee }
        this.openCreateEmployeeDialog(formData)
      }
    });
  }

  onEdit(empId: number) {
    console.log('empId', empId)
  }

}
