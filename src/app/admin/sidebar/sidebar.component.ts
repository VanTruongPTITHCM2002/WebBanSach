import { showResponseSuccess } from './../../response/sweetAlert';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  logOut() {
    localStorage.removeItem('username');

    this.http.post<any>('http://localhost:5000/auth/logout',{}, {withCredentials: true}).subscribe({
      next: (v: any) => {
        showResponseSuccess(v.message)
      }
    });
    this.router.navigate([
      '/login'
    ]);
  }
}
