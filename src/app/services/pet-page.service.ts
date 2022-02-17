import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vet } from '../Models/Vet';
import { VetService } from './collections/vet.service';

@Injectable({
  providedIn: 'root'
})
export class PetPageService {

  vetWithEmployees!: Observable<Vet>

  constructor(
    private vetService: VetService
  ) { }

  getVetByIdWithEmployees(vetId: number): Observable<Vet> {
    if (!this.vetWithEmployees) {
      this.vetWithEmployees = this.vetService.fetchVetById(vetId, 'employees')
      console.log('vetFetched')
    }
    return this.vetWithEmployees
  }
}
