import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from './Models/Session';
import { User } from './Models/User';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentSession!: Session | null

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserSession()
    this.storageService.sessionChanged.subscribe(s => {
      this.loadUserSession()
    })
  }

  loadUserSession() {
    this.currentSession = this.storageService.getCurrentSession()
  }

  onLogout() {
    this.storageService.removeCurrentSession()
    this.router.navigate(['./login'])
  }
}
