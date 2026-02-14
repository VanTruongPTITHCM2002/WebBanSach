import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpStatusCode,
} from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  showResponseFailure,
  showResponseSuccess,
} from '../../response/sweetAlert';
import { enviroment } from '../../../enviroment';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private plaformId: object
  ) {}
  ngOnDestroy(): void {}
  ngOnInit(): void {}

  @Output() toggleMode = new EventEmitter<void>(); // Khai báo EventEmitter

  isSubmit: boolean = false;
  onToggleMode() {
    this.toggleMode.emit(); // Gửi sự kiện để chuyển đổi chế độ
  }
  onSubmit(form: NgForm) {
    this.isSubmit = true;
    if (form.valid) {
      const { username, password } = form.value;
      this.http
        .post(
          `${enviroment.API_ROUTE}/api/v1/auth/login`,
          { username, password },
          { withCredentials: true },
        )
        .subscribe({
          next: (v: any) => {
            if (!v.success) {
              return showResponseFailure(v.message);
            }

            showResponseSuccess(v.message);
            this.authService.login();
            isPlatformBrowser(this.plaformId) && localStorage.setItem('username', username);
            this.router.navigate(['/']);
          },
          error: (e) => showResponseFailure(e.message),
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
