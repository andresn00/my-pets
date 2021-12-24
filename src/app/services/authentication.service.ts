import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/app/environment'
import { Observable } from 'rxjs';

interface LoginObject {
  identifier: string,
  password: string
}
const env = environment

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginApi: string = `${env.host}/api/auth/local`

  constructor(private http: HttpClient) { }

  login(data: LoginObject): Observable<any> {
    return this.http.post(this.loginApi, data)
  }

}
