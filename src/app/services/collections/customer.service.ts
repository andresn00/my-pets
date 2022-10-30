import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Customer } from 'src/app/Models/Customer';
import { ListResponse, RestBody, SingleResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersApi: string = `${environment.host}${environment.customersApi}`

  constructor(
    private http: HttpClient
  ) { }

  fetchCustomerById(id: number | string, populate?: string): Observable<Customer> {
    const url: string = `${this.customersApi}/${id}`
    let params = new HttpParams()
    params = params.appendAll({
      populate: `${populate || '*'}`
    })
    return this.http.get<SingleResponse<Customer>>(url, { params })
      .pipe(map(c => ({ id: c.data.id, ...c.data.attributes })))
  }

  fetchCustomerByUserId(userId: number, populate?: string): Observable<Customer> {
    let params: HttpParams = new HttpParams()
    params = params.appendAll({
      'filters[user][id][$eq]': userId.toString(),
      'populate': `${populate || '*'}`
    })
    return this.http.get<ListResponse<Customer>>(`${this.customersApi}`, { params })
      .pipe(map(custList => {
        const cust: Customer = {
          id: custList.data[0].id,
          ...custList.data[0].attributes
        }
        return cust
      }))
  }

  updateCustomer(customerId: number, customer: Customer): Observable<Customer> {
    const customerData: RestBody<Customer> = {
      data: customer
    }

    return this.http.put<SingleResponse<Customer>>(`${this.customersApi}/${customerId}`, customerData)
      .pipe(map(res => { return { id: res.data.id, ...res.data.attributes} }))
  }
}
