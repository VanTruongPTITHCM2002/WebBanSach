import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../../service/CartService';
import { Subscription } from 'rxjs';

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
  constructor(private router: Router, private authService: AuthService,
    private cartService: CartService
  ){
    this.addCart = new Subscription();
  }
  ngOnInit(): void {
    this.title = history.state.title;
  }

  addInCart(){
      const token = this.authService.getToken();
      // this.addCart = this.cartService.addCart( ,token)
  }
}
