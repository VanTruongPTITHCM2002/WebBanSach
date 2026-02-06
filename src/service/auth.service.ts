import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 isAuthenticated = signal<boolean>(localStorage.getItem('isAuthenticated') === 'true');

  login() {
    this.isAuthenticated.set(true);
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout() {
    this.isAuthenticated.set(false);
    localStorage.removeItem('isAuthenticated');
  }
}
