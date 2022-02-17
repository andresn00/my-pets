import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Control } from 'src/app/Models/PetActions';
import { RestBody, SingleResponse } from 'src/app/Models/RestObjects';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ControlService {
  private controlsApi = `${environment.host}${environment.controlsApi}`

  constructor(
    private http: HttpClient
  ) { }

  createControl(control: Control): Observable<SingleResponse<Control>> {
    const controlData: RestBody<Control> = {
      data: control
    }
    return this.http.post<SingleResponse<Control>>(this.controlsApi, controlData)
  }

}
