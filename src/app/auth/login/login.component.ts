import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http:HttpClient,private cookieService: CookieService, private router: Router){}
  @Output() toggleMode = new EventEmitter<void>(); // Khai báo EventEmitter

  onToggleMode() {
    this.toggleMode.emit(); // Gửi sự kiện để chuyển đổi chế độ
  }
  onSubmit(form:NgForm) {

    if(form.valid){
      const {username,password} = form.value;
      this.http.post('http://localhost:5000/auth/login', { username, password }).subscribe({
        next: (v) => this.cookieService.set('token',(Object.values(v).at(2))),
        error: (e) => alert(e.error.message),
        complete: ()=> {alert('Đăng nhập thành công'); this.router.navigate(['/'])},
       
    })
    }else {
      console.log('Form is invalid');
    }
  }
}
