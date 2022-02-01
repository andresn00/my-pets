import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse } from 'src/app/Models/RestObjects';
import { Session } from 'src/app/Models/Session';
import { User } from 'src/app/Models/User';
import { EmployeeService } from 'src/app/services/collections/employee.service';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';

interface Link {
  name: string
  url: string
  icon: string
}
@Component({
  selector: 'app-home-auth',
  templateUrl: './home-auth.component.html',
  styleUrls: ['./home-auth.component.scss']
})
export class HomeAuthComponent implements OnInit {

  currentUser!: User
  currentEmployee!: ListResponse<Employee>

  links: Link[] = [
    { name: 'Dashboard', url: 'dashboard', icon: 'home' },
    { name: 'Clientes', url: 'customers', icon: 'person' },
    { name: 'Veterinaria', url: 'vet', icon: 'local_hospital' },
    { name: 'Calendario', url: 'calendar', icon: 'calendar_month' },
  ]
  activeUrl!: string

  constructor(
    private storageService: StorageService,
    private employeeService: EmployeeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadSession();
    this.setActiveLink();
  }

  setActiveLink() {
    const activeLink = this.links.filter(l => { return this.router.url.includes(l.url); });
    this.activeUrl = activeLink[0]?.url;
    console.log(`activeLink`, activeLink)
  }

  private loadSession() {
    const currentSession = <Session>this.storageService.getCurrentSession();
    this.currentUser = currentSession.user;
    if (this.currentUser.isEmployee) {
      this.employeeService.fetchEmployeeByUserId(this.currentUser.id as number, 'user,vet')
        .subscribe((emp: ListResponse<Employee>) => {
          const employee = { id: emp.data[0].id, ...emp.data[0].attributes}
          this.storageService.setCurrentEmployee(employee);
          this.currentEmployee = emp
        });
    }
  }

  onLogout() {
    this.storageService.removeCurrentSession()
    this.router.navigate(['./login'])
  }

}
