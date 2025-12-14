import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModel,
  Validators,
} from '@angular/forms';
import {
  showResponseFailure,
  showResponseSuccess,
} from '../../response/sweetAlert';
import {
  HttpClient,
  HttpClientModule,
  HttpStatusCode,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { enviroment } from '../../../enviroment';

@Component({
  selector: 'admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class AdminLoginComponents implements OnInit {
  // rememberMe: boolean = false;
  @ViewChild('username') usernameModel!: NgModel;
  @ViewChild('rememberMe') rememberMeModel!: NgModel;
  @ViewChild('password') passwordModel!: NgModel;

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const saveUsername = localStorage.getItem('remember_username');
      const saveRemember = localStorage.getItem('remember_me');
      const savePassword = localStorage.getItem('remember_password');

      if (saveRemember === 'true' && saveUsername) {
        setTimeout(() => {
          this.usernameModel.control.setValue(saveUsername);
          this.passwordModel.control.setValue(atob(savePassword!));
          this.rememberMeModel.control.setValue(Boolean(saveRemember));
        });
      }
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      form.control.markAllAsTouched();
      return;
    }
    let { username, password, rememberMe } = form.value;
    // console.log('Remember Me: ', rememberMe);
    rememberMe = rememberMe ? true : false;
    this.http
      .post(
        `${enviroment.API_ROUTE}/auth/login`,
        { username, password, rememberMe },
        { withCredentials: true }
      )
      .subscribe({
        next: (v: any) => {
          console.log(v.statusCode);
          if (v.statusCode !== HttpStatusCode.Ok)
            return showResponseFailure(v.message);
          showResponseSuccess(v.message);
          if (typeof window !== undefined) {
            localStorage.setItem('username', username);
          }

          if (rememberMe === true) {
            localStorage.setItem('remember_username', username);
            localStorage.setItem('remember_password', btoa(password));
            localStorage.setItem('remember_me', rememberMe);
          } else {
            localStorage.setItem('remember_me', rememberMe);
            localStorage.removeItem('remember_username');
            localStorage.removeItem('remember_password');
          }

          this.router.navigate(['/admin/dashboard']);
        },
        error: (e) => {
          showResponseFailure(e.error.message);
        },
      });
  }
}
