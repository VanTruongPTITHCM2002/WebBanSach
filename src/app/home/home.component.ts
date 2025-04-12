import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from '../../entity/Category';
import { CategoryService } from '../../service/CategoryService';
import { Subscription } from 'rxjs';
import { Book } from '../../entity/Book';
import { BookService } from '../../service/BookService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
    category: Category[] = [];
    book: Book[] = [];
    getCategroy: Subscription;
    getBook: Subscription;
    constructor(private cookieService:CookieService,private categoryService: CategoryService
        ,private bookService:BookService
    ){
      this.getCategroy = new Subscription();
      this.getBook = new Subscription();
    }
  ngOnInit(): void {
     this.getCategroy = this.categoryService.getCategories().subscribe((data)=>{
      this.category = data.data ?? [];
     });
   
     this.getBook = this.bookService.getBooksByBuys().subscribe((data)=>{
      this.book = data.data ?? [];
     });
  }
  ngOnDestroy(): void {
    
  }
  
}
