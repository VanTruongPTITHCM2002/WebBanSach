import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, LoginComponent, SignupComponent],
  providers: [CookieService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private http:HttpClient,private cookieService: CookieService, private router: Router){}
  isLoginMode = true; // Chế độ mặc định là đăng nhập

  toggleMode() {
    this.isLoginMode = !this.isLoginMode; // Chuyển đổi giữa đăng nhập và đăng ký
  }


}
