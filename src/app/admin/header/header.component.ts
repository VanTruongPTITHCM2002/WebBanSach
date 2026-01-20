import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { showResponseSuccess } from '../../response/sweetAlert';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   http = inject(HttpClient);
   router = inject(Router);
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
