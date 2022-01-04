import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Vet } from '../Models/Vet';
import { environment } from 'src/app/environment'
import { StorageService } from './storage.service';
import { Employee } from '../Models/Employee';
import { Observable } from 'rxjs';
import { RestBody, SingleResponse } from '../Models/RestObjects';
import { Customer } from '../Models/Customer';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private vetsApi: string = `${environment.host}${environment.vetsApi}`
  private employeesApi: string = `${environment.host}${environment.employeesApi}`
  private customersApi: string = `${environment.host}${environment.customersApi}`
  private registerUsersApi: string = `${environment.host}/api/auth/local/register`

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  registerVet(vet: Vet): Observable<any> {
    const vetBody: RestBody<Vet> = {
      data: vet
    }
    return this.http.post(this.vetsApi, vetBody)
  }

  registerEmployee(employee: Employee): Observable<any> {
    const employeeBody: RestBody<Employee> = {
      data: employee
    }
    return this.http.post(this.employeesApi, employeeBody)
  }

  registerCustomer(customer: Customer): Observable<SingleResponse<Customer>> {
    const customerBody: RestBody<Customer> = {
      data: customer
    }
    return this.http.post<SingleResponse<Customer>>(this.customersApi, customerBody)
  }

  registerUser(user: User): Observable<any> {
    const userBody: RestBody<User> = {
      data: user
    }
    return this.http.post(this.registerUsersApi, user)
  }

  rollbackVet(id: number): Observable<any> {
    return this.http.delete(`${this.vetsApi}/${id}`)
  }

  rollbackUser(id?: number): Observable<any> {
    return this.http.delete(`${this.registerUsersApi}/${id}`)
  }
}
