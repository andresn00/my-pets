import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Session } from '../Models/Session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSessionKey: string = 'currentSession'
  private currentSession!: Session | null

  public sessionChanged: Subject<any> = new Subject<any>()

  constructor(private router: Router) {
    this.loadSessionData()
   }
   
   loadSessionData(): void {
    const sessionStr = localStorage.getItem(this.currentSessionKey)
    this.currentSession = sessionStr ? <Session> JSON.parse(sessionStr) : null
   }

   setCurrentSession(session: Session){
     this.currentSession = session
     localStorage.setItem(this.currentSessionKey, JSON.stringify(session))
     this.sessionChanged.next(true)
   }

   getCurrentSession(): Session | null {
     return this.currentSession
   }

   removeCurrentSession(): void {
     localStorage.removeItem(this.currentSessionKey)
     this.currentSession = null
     this.sessionChanged.next(true)
   }

   isAuthenticated(): boolean {
     return this.getCurrentToken() != null
   }

   getCurrentToken() : string | null {
     const session = this.getCurrentSession()
     return (session && session.jwt) ? session.jwt : null
   }

   logout(): void {
     this.removeCurrentSession()
     this.router.navigate(['/login'])
   }
}
