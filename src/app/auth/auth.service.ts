import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

    private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private cookieService: CookieService, private http:HttpClient) {
     this.authState.next(this.hasToken());
    
  }

  private hasToken(): boolean {
     return this.cookieService ? !!this.cookieService.get('token') : false;
  }

  // Observable để các component subscribe
  get isAuthenticated$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  // getter thuần cho ngIf dùng
  get isAuthenticated(): boolean {
    return this.authState.value;
  }

  checkAuthStatus(): Observable<boolean> {
  return this.http.get<{ authenticated: boolean }>('http://localhost:5000/auth/status', {
    withCredentials: true
  }).pipe(
    map(response => response.authenticated),
    catchError(() => of(false))
  );
}

  login(token: string, username: string) {
    this.cookieService.set('token', token, {
  expires: 7,
  path: '/',
  secure: false,
  sameSite: 'Lax'
});
   this.cookieService.set('username', username, {
  expires: 7,
  path: '/',
  secure: false,
  sameSite: 'Lax'
});
    this.authState.next(true); // 🔔 Báo đã login
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('username', '/');
    this.authState.next(false); // 🔔 Báo đã logout
  }

  getUsername(): string {
    return this.cookieService.get('username');
  }

  getToken(): string {
    return this.cookieService.get('token');
  }
 

}
