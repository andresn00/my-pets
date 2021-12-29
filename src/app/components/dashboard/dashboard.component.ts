import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { Session } from 'src/app/Models/Session';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private session!: Session | null

  constructor(
    private employeeService: EmployeeService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    // this.session = this.storageService.getCurrentSession()
    // this.employeeService.fetchEmployeeByUserId(<number>this.session?.user.id)
    //   .subscribe((employee: ListResponse<Employee>) => {
    //     console.log(`employee`, employee)
    //   })
  }

}
