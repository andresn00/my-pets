import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponse } from '../Models/RestObjects';
import { Vet } from '../Models/Vet';
import { VetService } from './collections/vet.service';

@Injectable({
  providedIn: 'root'
})
export class PetPageService {

  vetWithEmployees!: Observable<SingleResponse<Vet>>

  constructor(
    private vetService: VetService
  ) { }

  getVetByIdWithEmployees(vetId: number): Observable<SingleResponse<Vet>> {
    if (!this.vetWithEmployees) {
      this.vetWithEmployees = this.vetService.fetchVetById(vetId, 'employees')
      console.log('vetFetched')
    }
    return this.vetWithEmployees
  }
}
