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

  
  fetchPetById(petId: number, params: HttpParams = new HttpParams()): Observable<SingleResponse<Pet>>{
    const url = `${this.petsApi}/${petId}`
    return this.http.get<SingleResponse<Pet>>(url, {params})
  }
  
  createPet(pet: Pet): Observable<SingleResponse<Pet>> {
    const petData: RestBody<Pet> = {
      data: pet
    }
    return this.http.post<SingleResponse<Pet>>(this.petsApi, petData)
  }

  updatePet(petId: number, pet: Pet): Observable<SingleResponse<Pet>> {
    const petData: RestBody<Pet> = {
      data: pet
    }
    return this.http.put<SingleResponse<Pet>>(`${this.petsApi}/${petId}`, petData)
  }
  deletePet(petId: number): Observable<SingleResponse<Pet>> {
    return this.http.delete<SingleResponse<Pet>>(`${this.petsApi}/${petId}`)
  }

}
