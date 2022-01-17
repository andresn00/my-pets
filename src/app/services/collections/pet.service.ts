import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment';
import { Pet } from 'src/app/Models/Pet';
import { RestBody, SingleResponse } from 'src/app/Models/RestObjects';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private petsApi = `${environment.host}${environment.petsApi}`

  constructor(
    private http: HttpClient
  ) { }

  createPet(pet: Pet): Observable<SingleResponse<Pet>> {
    const petData: RestBody<Pet> = {
      data: pet
    }
    return this.http.post<SingleResponse<Pet>>(this.petsApi, petData)
  }

  fetchVetById(petId: number, populate?: string): Observable<SingleResponse<Pet>>{
    const url = `${this.petsApi}/${petId}`
    let params: HttpParams = new HttpParams()
    params = params.appendAll({
      'populate': `${populate || ''}`
    })

    return this.http.get<SingleResponse<Pet>>(url, {params})
  }

}
