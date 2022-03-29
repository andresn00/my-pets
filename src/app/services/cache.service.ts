import { Injectable } from '@angular/core';
import { Vet } from '../Models/Vet';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  vet!: Vet

  constructor() { }

}
