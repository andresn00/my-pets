import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  createVaccine(vaccine: Vaccine): Observable<SingleResponse<Vaccine>> {
    const vaccineData: RestBody<Vaccine> = {
      data: vaccine
    }
    return this.http.post<SingleResponse<Vaccine>>(this.vaccinesApi, vaccineData)
  }
}
