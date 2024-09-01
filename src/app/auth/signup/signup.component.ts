import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @Output() toggleMode = new EventEmitter<void>(); // Khai báo EventEmitter

  onToggleMode() {
    this.toggleMode.emit(); // Gửi sự kiện để chuyển đổi chế độ
  }
  onSubmitRegister(form: NgForm) {
    // Xử lý đăng ký
    console.log('Đăng ký:', form.value);
  }
}
