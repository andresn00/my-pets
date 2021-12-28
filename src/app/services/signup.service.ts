import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Vet } from '../Models/Vet';
import { environment } from 'src/app/environment'
import { StorageService } from './storage.service';
import { Employee } from '../Models/Employee';
import { Observable } from 'rxjs';
import { RestBodyObject } from '../Models/RestBodyObject';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private vetsApi: string = `${environment.host}${environment.vetsApi}`
  private employeesApi: string = `${environment.host}${environment.employeesApi}`
  private usersApi: string = `${environment.host}${environment.usersApi}`

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  createVet(vetData: Vet): Observable<any> {
    const vetBody: RestBodyObject = {
      data: vetData
    }
    console.log(`vetBody`, vetBody)
    return this.http.post(this.vetsApi, vetBody)
  }

  createEmployee(employeeData: Employee): Observable<any> {
    const employeeBody: RestBodyObject = {
      data: employeeData
    }
    console.log(`employeeBody`, employeeBody)
    return this.http.post(this.employeesApi, employeeBody)
  }

  createUser(userData: User): Observable<any> {
    const userBody: RestBodyObject = {
      data: userData
    }
    console.log(`userBody`, userBody)
    return this.http.post(this.usersApi, userData)
  }

  rollbackVet(id: number): Observable<any> {
    return this.http.delete(`${this.vetsApi}/${id}`)
  }

  rollbackUser(id?: number): Observable<any> {
    return this.http.delete(`${this.usersApi}/${id}`)
  }
}
