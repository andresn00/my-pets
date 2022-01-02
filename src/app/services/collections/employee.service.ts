import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environment';
import { Employee } from 'src/app/Models/Employee';
import { ListResponse, SingleResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesApi: string = `${environment.host}${environment.employeesApi}`
  constructor(
    private http: HttpClient
  ) { }

  fetchEmployeeByUserId(userId: number): Observable<ListResponse<Employee>> {
    let params: HttpParams = new HttpParams()
    params = params.appendAll({
      'filters[user][id][$eq]': userId.toString(),
      'populate': '*'
    })
    return this.http.get<ListResponse<Employee>>(`${this.employeesApi}?filters[user][id][$eq]=6&populate=*`)
  }

}
