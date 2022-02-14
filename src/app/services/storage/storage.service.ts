import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Employee } from '../../Models/Employee';
import { ListResponse } from '../../Models/RestObjects';
import { Session } from '../../Models/Session';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private currentSessionKey: string = 'currentSession'
  private currentSession!: Session | null
  private currentEmployeeKey: string = 'currentEmployee'
  private currentEmployee!: Employee | null
  private currentVetIdKey: string = 'currentVetId'
  private currentVetId!: number | null

  public sessionChanged: Subject<any> = new Subject<any>()

  constructor(private router: Router) {
    this.loadSessionData()
   }
   
   loadSessionData(): void {
    const sessionStr = localStorage.getItem(this.currentSessionKey)
    this.currentSession = sessionStr ? <Session> JSON.parse(sessionStr) : null
    const employeeStr = localStorage.getItem(this.currentEmployeeKey)
    this.currentEmployee = employeeStr ? <Employee> JSON.parse(employeeStr) : null
    const vetIdStr = localStorage.getItem(this.currentVetIdKey)
    this.currentVetId = vetIdStr ? <number> +vetIdStr : null
   }

   setCurrentSession(session: Session){
     this.currentSession = session
     localStorage.setItem(this.currentSessionKey, JSON.stringify(session))
     this.sessionChanged.next(true)
   }

   setCurrentEmployee(employee: Employee){
     this.currentEmployee = employee
     localStorage.setItem(this.currentEmployeeKey, JSON.stringify(employee))
   }
   setCurrentVetId(vetId: number){
     this.currentVetId = vetId
     localStorage.setItem(this.currentVetIdKey, vetId.toString())
   }

   getCurrentSession(): Session | null {
     return this.currentSession
   }

   getCurrentEmployee(): Employee | null {
     return this.currentEmployee
   }

   getCurrentVetId(): number | null {
     return this.currentVetId
   }

   removeCurrentSession(): void {
     localStorage.removeItem(this.currentSessionKey)
     this.currentSession = null
     this.removeCurrentEmployee()
     this.removeCurrentVetId()
     this.sessionChanged.next(true)
   }

   removeCurrentEmployee(): void {
     localStorage.removeItem(this.currentEmployeeKey)
     this.currentEmployee = null
   }
   removeCurrentVetId(): void {
     localStorage.removeItem(this.currentVetIdKey)
     this.currentVetId = null
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
