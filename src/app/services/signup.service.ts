import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Vet } from '../Models/Vet';
import { environment } from 'src/app/environment'
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupApi: string = `${environment.host}/api/`

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  signupVet(vetData: Vet, userData: User) {
    console.log(`vetData`, vetData)
    console.log(`userData`, userData)

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.storageService.getCurrentToken()}`
      })
    }
    // TODO: post Vet
    // TODO: post User
    // this.http.post(this.signupApi, {}, httpOptions)
  }
}
