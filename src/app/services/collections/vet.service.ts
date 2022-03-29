import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SingleResponse } from 'src/app/Models/RestObjects';
import { Vet } from 'src/app/Models/Vet';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  private vetsApi: string = `${environment.host}${environment.vetsApi}`

  private vet!: Observable<Vet>

  constructor(
    private http: HttpClient
  ) { }

  fetchVetById(vetId: number, populate?: string, ignoreCache: boolean = true): Observable<Vet> {
    if (ignoreCache || !this.vet) {
      console.log('Not cache')
      const url = `${this.vetsApi}/${vetId}`
      let params: HttpParams = new HttpParams()
      params = params.appendAll({
        'populate': `${populate || ''}`
      })
      
      this.vet = this.http.get<SingleResponse<Vet>>(url, { params })
      .pipe(map(v => ({ id: v.data.id, ...v.data.attributes })))
    }
    return this.vet
  }
}
