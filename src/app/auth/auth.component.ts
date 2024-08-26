import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  providers: [CookieService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private http:HttpClient,private cookieService: CookieService){}
  onSubmit(form:NgForm) {

    if(form.valid){
      const {username,password} = form.value;
      this.http.post<{ accessToken: string }>('http://localhost:5000/auth/login', { username, password }).subscribe({
        next: (v) => this.cookieService.set('token',v.accessToken),
        error: (e) => console.error(e),
        complete: ()=> alert('Đăng nhập thành công'),
       
    })
    }else {
      console.log('Form is invalid');
    }
  }
}
