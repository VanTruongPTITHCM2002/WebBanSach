import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import registerRequest from '../../request/registerRequest';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @Output() toggleMode = new EventEmitter<void>(); // Khai báo EventEmitter
  isRegisterMode = false;
  formData: registerRequest = {
    username: '',
    password: '',
    repassword: '',
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: ''
  }; // Khởi tạo formData với giá trị mặc định
  onRegisterMode() {
    this.isRegisterMode = !this.isRegisterMode;
  }
  onToggleMode() {
    this.toggleMode.emit(); // Gửi sự kiện để chuyển đổi chế độ
  }
  onSubmitRegister(form: NgForm) {
    const forms = form.value as registerRequest;
    
  
  
      this.formData = { ...this.formData, ...forms };
      console.log(this.formData)
    
  }
}
