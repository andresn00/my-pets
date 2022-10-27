import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Vaccine } from 'src/app/Models/PetActions';
import { RestBody, SingleResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {
  private vaccinesApi = `${environment.host}${environment.vaccinesApi}`

  constructor(
    private http: HttpClient
  ) { }

  createVaccine(vaccine: Vaccine): Observable<Vaccine> {
    const vaccineData: RestBody<Vaccine> = {
      data: vaccine
    }
    return this.http.post<SingleResponse<Vaccine>>(this.vaccinesApi, vaccineData)
      .pipe(map(v => ({ id: v.data.id, ...v.data.attributes })))
  }

  updateVaccine(vaccineId: number, vaccine: Vaccine): Observable<Vaccine> {
    const vaccineData: RestBody<Vaccine> = {
      data: vaccine
    }
    return this.http.put<SingleResponse<Vaccine>>(`${this.vaccinesApi}/${vaccineId}`, vaccineData)
      .pipe(map(v => ({ id: v.data.id, ...v.data.attributes })))
  }
}
