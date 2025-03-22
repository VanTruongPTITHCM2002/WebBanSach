import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from '../../entity/Category';
import { CategoryService } from '../../service/CategoryService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
    category: Category[] = [];
    getCategroy: Subscription;
    constructor(private cookieService:CookieService,private categoryService: CategoryService){
      this.getCategroy = new Subscription();
    }
  ngOnInit(): void {
     this.getCategroy = this.categoryService.getCategories().subscribe((data)=>{
      this.category = data.data ?? [];
     });
      
  }
  ngOnDestroy(): void {
  
  }
  
}
