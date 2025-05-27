import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Cart } from "../../entity/Cart";
import { Subscription } from "rxjs/internal/Subscription";
import { CartService } from "../../service/CartService";

@Component({
    selector:'header-component',
    standalone:true,
    imports:[CommonModule, FormsModule, RouterLink],
    templateUrl:'./header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
    txtSearch = '';
    cart: Cart | null = null;
    getCarts: Subscription;
    total: number  = 0;
    constructor(public authService: AuthService, private router: Router,
        public cookieService: CookieService,
        public cartService: CartService,
      ){
          this.getCarts = new Subscription();
        }

    searchValue(strSearch: string) {
        this.txtSearch = strSearch;
        console.log(this.txtSearch);
  }

   ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
          this.getCartsUsername();
      }});
   }

   isClickFormLogin() {
    this.cookieService.set('isFormLogin', String(true));
  }

  logout() {
    this.authService.logout();
  }

  updateTotal(){
     this.total = this.cart?.cartItems.reduce((acc, item) => {
      return acc + (Number(item.price) * Number(item.quantity));
    }, 0)!;
  }

  getCartsUsername(){
      const token = this.authService.getToken()
      const username = this.authService.getUsername();
   this.getCarts = this.cartService.getCartByUsername(username, token).subscribe((data)=>{
      this.cart = data.data ?? this.cart;  
    this.total = this.cart?.cartItems.reduce((acc, item) => {
      return acc + (Number(item.price) * Number(item.quantity));
    }, 0)!;
     });
  }
}