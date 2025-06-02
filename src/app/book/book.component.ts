import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../../service/CartService';
import { Subscription } from 'rxjs';
import { BookResponse } from '../../entity/Book';
import { BookService } from '../../service/BookService';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  title = '';
  addCart: Subscription;
  getBookById: Subscription;
  book: BookResponse | null = null;
  constructor(private router: Router, private authService: AuthService,
    private bookService: BookService, private route: ActivatedRoute
  ){
    this.addCart = new Subscription();
    this.getBookById = new Subscription();
  }
  ngOnInit(): void {
    this.title = history.state.title;
    const id = this.route.snapshot.paramMap.get('id');
    this.getBookById = this.bookService.getBookById(Number(id)).subscribe((data) =>
      this.book = data.data!
    )
  }

  addInCart(){
      const token = this.authService.getToken();
      // this.addCart = this.cartService.addCart( ,token)
  }
}
