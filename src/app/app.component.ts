import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { EmployeeService } from './employee/employee.service';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HttpClientModule, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: '<app-category></app-category>',
  providers: [EmployeeService]
})
export class AppComponent {
  title = 'front-end-app';
}
