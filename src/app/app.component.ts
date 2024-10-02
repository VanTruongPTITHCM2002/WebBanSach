import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  imports: [RouterOutlet, RouterLink, HttpClientModule, AuthComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: '<app-category></app-category>',
  providers: [EmployeeService, AuthService]
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
    public cookieService: CookieService, private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.cookieService.set('isFormLogin',String(false));
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/auth/login']);
    this.cookieService.set('isFormLogin',String(true));
  }

  isClickFormLogin() {
    this.cookieService.set('isFormLogin', String(true));
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
