import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './../employee/employee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Nhập CommonModule và HttpClientModule nếu cần
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  employees: any[] | undefined;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployees().subscribe({
      next: (data: any[]) => {
        this.employees = data;
        console.log('Employees:', this.employees); // Kiểm tra dữ liệu nhận được
      },
      error: (err) => console.error('Error fetching employees:', err) // Kiểm tra lỗi nếu có
    });
  }
}
