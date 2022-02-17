import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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


  fetchPetById(petId: number, params: HttpParams = new HttpParams()): Observable<Pet> {
    const url = `${this.petsApi}/${petId}`
    return this.http.get<SingleResponse<Pet>>(url, { params })
      .pipe(map(p => ({ id: p.data.id, ...p.data.attributes })))
  }

  createPet(pet: Pet): Observable<Pet> {
    const petData: RestBody<Pet> = {
      data: pet
    }
    return this.http.post<SingleResponse<Pet>>(this.petsApi, petData)
      .pipe(map(p => ({ id: p.data.id, ...p.data.attributes })))
  }

  updatePet(petId: number, pet: Pet): Observable<Pet> {
    const petData: RestBody<Pet> = {
      data: pet
    }
    return this.http.put<SingleResponse<Pet>>(`${this.petsApi}/${petId}`, petData)
    .pipe(map(p => ({id: p.data.id, ...p.data.attributes})))
  }

  deletePet(petId: number): Observable<Pet> {
    return this.http.delete<SingleResponse<Pet>>(`${this.petsApi}/${petId}`)
    .pipe(map(p => ({id: p.data.id, ...p.data.attributes})))
  }

}
