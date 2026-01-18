import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import registerRequest from '../../request/registerRequest';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private http:HttpClient, private router:Router,private cookieService:CookieService){}
  ngOnInit(): void {

  }
  @Output() toggleMode = new EventEmitter<void>(); // Khai báo EventEmitter
  isRegisterMode = false;
  isContinue:boolean = false;
  formData: registerRequest = {
    username: '',
    password: '',
    repassword: '',
  }; 
  onRegisterMode(form:NgForm) {
    if(form.invalid){
      this.isContinue = true;
      return;
    }
    this.isRegisterMode = !this.isRegisterMode;
   
  }
  onToggleMode() {
    this.toggleMode.emit(); 
  }
  onSubmitRegister(form: NgForm) {
   
    if (form.valid) {
      const forms = form.value as registerRequest;
      this.formData = { ...this.formData, ...forms };

      this.http
        .post('http://localhost:5000/api/v1/auth/signup', this.formData)
        .subscribe({
          next: (v) => console.log(v),
          error: (e) => console.log(e.error),
          complete: () => {
            alert('Đăng ký thành công');
            this.router.navigate(['/']);
          },
        });
    } else {
      console.log('Form is invalid');
    }

  }
}
