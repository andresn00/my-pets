import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesApi: string = `${environment.host}${environment.employeesApi}`
  constructor(
    private http: HttpClient
  ) { }

  fetchEmployeeByUserId(userId: number): Observable<any> {
    const url: string = `${this.employeesApi}`
    
    let params: HttpParams = new HttpParams()
    params.append('filters[user][id][$eq]', userId.toString())
    params.append('populate', '*')
    return this.http.get<any>(url, {params: params})
  }

}
