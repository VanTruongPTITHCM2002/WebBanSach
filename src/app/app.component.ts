import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeService } from './employee/employee.service';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../service/CartService';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule
    ,FormsModule,HeaderComponent, FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService,
    public cookieService: CookieService, private cdRef: ChangeDetectorRef,
  public cartService: CartService) {
  
  }
  ngOnInit(): void {
    this.cookieService.set('isFormLogin',String(false));
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
