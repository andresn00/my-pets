import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Appointment } from 'src/app/Models/PetActions';
import { ListResponse, RestBody, SingleResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentsApi = `${environment.host}${environment.appointmentsApi}`

  constructor(
    private http: HttpClient
  ) { }

  fetchAppointments(params: HttpParams): Observable<Appointment[]> {
    return this.http.get<ListResponse<Appointment>>(this.appointmentsApi, { params })
      .pipe(map(apptsRes => {
        return apptsRes.data.map(a => ({ id: a.id, ...a.attributes }))
      }))
  }

  fetchPendingApptsFromVetInRange(vetId: number, startDate: string, endDate: string): Observable<Appointment[]> {
    let params = new HttpParams()
    params = params.appendAll({
      'filters[vet][id]': `${vetId}`,
      'filters[status]': 'pending',
      'filters[datetime][$gte]': `${startDate}`,
      'filters[datetime][$lte]': `${endDate}`,
      'populate': '*',
      'sort': 'datetime'
    })
    return this.fetchAppointments(params)
  }

  fetchPendingApptsFromPetInVet(petId: number, vetId: number): Observable<Appointment[]> {
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'vet,employees',
      'filters[pet][id]': petId,
      'filters[vet][id]': vetId,
      'filters[status]': 'pending',
      'sort': 'datetime'
    })
    return this.fetchAppointments(params)
  }

  createAppointment(appt: Appointment): Observable<SingleResponse<Appointment>> {
    let params = new HttpParams()
    params = params.appendAll({
      'populate': 'vet,employees',
    })
    const data: RestBody<Appointment> = {
      data: appt
    }
    return this.http.post<SingleResponse<Appointment>>(this.appointmentsApi, data, { params })
  }

  updateAppointment(apptId: number, data: RestBody<any>): Observable<SingleResponse<Appointment>> {
    return this.http.put<SingleResponse<Appointment>>(`${this.appointmentsApi}/${apptId}`, data)
  }

  updateAppointmentStatus(apptId: number, status: string): Observable<SingleResponse<Appointment>> {
    const data: RestBody<any> = {
      data: { status }
    }
    return this.updateAppointment(apptId, data)
  }
}
