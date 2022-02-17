import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
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

  fetchEmployeeByUserId(userId: number, populate?: string): Observable<Employee> {
    let params: HttpParams = new HttpParams()
    params = params.appendAll({
      'filters[user][id][$eq]': userId.toString(),
      'populate': `${populate || '*'}`
    })
    return this.http.get<ListResponse<Employee>>(`${this.employeesApi}`, { params })
      .pipe(map(empList => {
        const emp: Employee = {
          id: empList.data[0].id,
          ...empList.data[0].attributes
        }
        return emp
      }))
  }

}
