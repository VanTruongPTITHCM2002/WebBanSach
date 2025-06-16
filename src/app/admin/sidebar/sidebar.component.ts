import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {

  }

  logOut() {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('username', '/');
    this.router.navigate([
      '/login'
    ]);
  }
}
