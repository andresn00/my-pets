import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Customer } from 'src/app/Models/Customer';
import { SingleResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersApi: string = `${environment.host}${environment.customersApi}`

  constructor(
    private http: HttpClient
  ) { }

  fetchCustomerById(id: number | string, populate?: string): Observable<SingleResponse<Customer>> {
    const url: string = `${this.customersApi}/${id}`
    let params = new HttpParams()
    params = params.appendAll({
      populate: `${populate || '*'}`
    })
    return this.http.get<SingleResponse<Customer>>(url, {params})
  }
}
