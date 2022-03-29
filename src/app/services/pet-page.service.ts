import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Vet } from '../Models/Vet';
import { VetService } from './collections/vet.service';

@Injectable({
  providedIn: 'root'
})
export class PetPageService {

  vetWithEmployees!: Observable<Vet>
  currentVetId!: number

  constructor(
    private vetService: VetService
  ) { }

  getVetByIdWithEmployees(vetId: number): Observable<Vet> {
    if (!this.vetWithEmployees) {
      return this.fetchVetByIdWithEmployees(vetId);
    }
    if (this.currentVetId !== vetId){
      return this.fetchVetByIdWithEmployees(vetId)
    }
    return this.vetWithEmployees
  }
  
  private fetchVetByIdWithEmployees(vetId: number) {
    console.log('vetFetched')
    return this.vetService.fetchVetById(vetId, 'employees').pipe(
      (vet) => this.vetWithEmployees = vet,
      map(vet => {
        this.currentVetId = vet.id as number;
        return vet;
      })
    );
  }
}
