import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2'
import { showResponseSuccess } from '../../response/sweetAlert';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private http:HttpClient,private cookieService: CookieService, private router: Router){}
  ngOnInit(): void {
   if(this.cookieService.get('isFormLogin') === 'false'){
      this.cookieService.set('isFormLogin',String(true));
   }
  }
  
  @Output() toggleMode = new EventEmitter<void>(); // Khai báo EventEmitter

  showAlert:string = '';
  isSubmit: boolean = false;
  onToggleMode() {
    this.toggleMode.emit(); // Gửi sự kiện để chuyển đổi chế độ
  }
  onSubmit(form:NgForm) {
    this.isSubmit = true;
    if(form.valid){
      const {username,password} = form.value;
      this.http.post('http://localhost:5000/auth/login', { username, password }).subscribe({
        next: (v) => {this.cookieService.set('token',(Object.values(v).at(2))); this.showAlert = Object.values(v).at(1)
          ,showResponseSuccess(this.showAlert)
          this.router.navigate(['/'])
        },
        error: (e) => alert(e.error.message),
        // complete: ()=> {console.log(this.showAlert),this.router.navigate(['/'])},
       
    })
    }else {
      
      console.log('Form is invalid');
    }
  }
}
