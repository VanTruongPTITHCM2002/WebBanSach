import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { error } from 'console';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private http:HttpClient){}
  onSubmit(form:NgForm) {
    console.log('Form data:', form.value);
  console.log('Form validity:', form.valid);
    if(form.valid){
      const {username,password} = form.value;
      this.http.post('http://localhost:5000/auth/login',{
        username,password 
      }).subscribe(response =>{
          alert('Đăng nhập thành công');
      },error=>{
          alert(error.error.message)
      })
    }else {
      console.log('Form is invalid');
    }
  }
}
