import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { EmployeeService } from './employee/employee.service';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HttpClientModule, AuthComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: '<app-category></app-category>',
  providers: [EmployeeService,AuthService]
})
export class AppComponent {
  constructor(public authService: AuthService, private router: Router,
    private cookieService: CookieService) {}

  logout() {
    // Remove the token from cookies or local storage
    this.cookieService.delete('token'); // Adjust this if using another storage method
    
    // Redirect the user to the login page or home page
    this.router.navigate(['/auth/login']); // Adjust this route if needed
  }
}
