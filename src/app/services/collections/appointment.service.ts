import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Appointment } from 'src/app/Models/Appointment';
import { ListResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentsApi = `${environment.host}${environment.appointmentsApi}`

  constructor(
    private http: HttpClient
  ) { }

  fetchAppointmentsFromVetInRange(vetId: number, startDate: string, endDate: string): Observable<ListResponse<Appointment>> {
    let params = new HttpParams()
    params = params.appendAll({
      'filters[vet][id]': `${vetId}`,
      'filters[date][$gte]': `${startDate}`,
      'filters[date][$lte]': `${endDate}`,
      'populate': '*'
    })
    return this.http.get<ListResponse<Appointment>>(this.appointmentsApi, { params })
  }
}
