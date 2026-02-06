import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from '../../entity/Category';
import { Subscription } from 'rxjs';
import { Book } from '../../entity/Book';
import { BookService } from '../../service/book.service';
import { FormControl } from '@angular/forms';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  category: Category[] = [];
  book: Book[] = [];
  categories: {
    categoryId: string;
    name: string;
  }[] = [];
  getCategroy: Subscription;
  getBook: Subscription;
  images: string[] = [
    'https://media.istockphoto.com/id/949118068/vi/anh/s%C3%A1ch-v%E1%BB%9F.jpg?s=2048x2048&w=is&k=20&c=rgFGgZSTrcVF1MziZxwfxuTdApVnDlp-uZSJY8iTbOA=',
    'https://media.istockphoto.com/id/2060984408/vi/anh/ch%E1%BB%93ng-s%C3%A1ch-%C4%91%E1%BA%A7y-m%C3%A0u-s%E1%BA%AFc-n%E1%BB%81n-t%E1%BA%A3ng-gi%C3%A1o-d%E1%BB%A5c-tr%E1%BB%9F-l%E1%BA%A1i-tr%C6%B0%E1%BB%9Dng-h%E1%BB%8Dc-s%C3%A1ch-b%C3%ACa-' +
      'c%E1%BB%A9ng-%C4%91%E1%BA%A7y-m%C3%A0u-s%E1%BA%AFc-s%C3%A1ch-tr%C3%AAn.jpg?s=2048x2048&w=is&k=20&c=_sRznS_LsGXJ2R_4p-soL2xJ8sSYkyunL_qzyjWBRTo=',
    '/your-own-library-landing-page-template_151150-680.jpg',
  ];

  constructor(
    private categoryService: CategoryService,
    private bookService: BookService,
  ) {
    this.getCategroy = new Subscription();
    this.getBook = new Subscription();
  }
  async ngOnInit(): Promise<void> {
    // this.getCategroy = this.categoryService
    //   .getCategories()
    //   .subscribe((data) => {
    //     this.category = data.data.content ?? [];
    //   });

    this.getBook = this.bookService.getBooksByBuys().subscribe((data) => {
      this.book = data.data ?? [];
    });

    this.categoryService.getCategoriesNotPaginate().subscribe((data) => {
      this.categories = data.data ?? [];
    });
  }

  ngOnDestroy(): void {}
}
