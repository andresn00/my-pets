import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token: string | null = this.storageService.getCurrentToken()
      const hasAuthorization = req.headers.has('Authorization')

      if (hasAuthorization) {
        return next.handle(req)
      }
      if (token) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        })
        return next.handle(cloned)
      }
      return next.handle(req)
  }

  constructor(private storageService: StorageService) { }
}
