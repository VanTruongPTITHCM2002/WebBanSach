import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../../service/CartService';
import { Subscription } from 'rxjs';
import { Book, BookResponse } from '../../entity/Book';
import { BookService } from '../../service/BookService';
import { CookieService } from 'ngx-cookie-service';
import { CreateCartItem } from '../../entity/Cart';
import { FormsModule } from '@angular/forms';
import { showResponseSuccess } from '../response/sweetAlert';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  title = '';
  addCart: Subscription;
  quantity: number = 1;
  getBookById: Subscription;
  book: BookResponse | null = null;
  constructor(private router: Router, private authService: AuthService,
    private bookService: BookService, private route: ActivatedRoute,
    private cartService: CartService,
    private cookieService: CookieService
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

  addCartBook (book: BookResponse): void{
    const token = this.cookieService.get('token');
    if(!token){
      this.router.navigate(['/auth/login']);
    }
    const username = this.authService.getUsername();
     const createCartItem:CreateCartItem = {
          cartDto: {
            username: username,
          },
          bookName: book.title,
          quantity: this.quantity,
         
        }
    //  console.log(this.quantity);
    this.addCart = this.cartService.addCart(createCartItem, token).subscribe(data => 
    { 
        showResponseSuccess('Thêm vào giỏ hàng thành công');
        setTimeout(() =>  window.location.reload(), 3000);  
    });
  }

  buyBook (book: Book){
    const token = this.cookieService.get('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
    }
  }
}
