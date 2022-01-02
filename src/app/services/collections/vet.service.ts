import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponse } from 'src/app/Models/RestObjects';
import { Vet } from 'src/app/Models/Vet';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  private vetsApi: string = `${environment.host}${environment.vetsApi}`

  constructor(
    private http: HttpClient
  ) { }

  fetchVetById(vetId: number, populate?: string): Observable<SingleResponse<Vet>>{
    const url = `${this.vetsApi}/${vetId}`
    let params: HttpParams = new HttpParams()
    params = params.appendAll({
      'populate': `${populate || ''}`
    })

    return this.http.get<SingleResponse<Vet>>(url, {params})
  }
}
