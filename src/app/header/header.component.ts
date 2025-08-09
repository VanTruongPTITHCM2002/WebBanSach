import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Cart, CartItem, UpdateCartItem } from "../../entity/Cart";
import { Subscription } from "rxjs/internal/Subscription";
import { CartService } from "../../service/CartService";
import { showResponseSuccess } from "../response/sweetAlert";
import { HttpClient } from "@angular/common/http";

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
    updateCart: Subscription;
    total: number  = 0;
    isAuthenticated = false;
    constructor(public authService: AuthService, private router: Router,
        public cookieService: CookieService,
        public cartService: CartService,
        private http:HttpClient
      ){
          this.getCarts = new Subscription();
          this.updateCart = new Subscription();
        }

    searchValue(strSearch: string) {
        this.txtSearch = strSearch;
  }

   ngOnInit(): void {
     this.authService.checkAuthStatus().subscribe(isAuth => {
       this.isAuthenticated = isAuth;
      // this.getCartsUsername();
     });
   }

   isClickFormLogin() {
   // this.cookieService.set('isFormLogin', String(true));
  }

  logout() {
  localStorage.removeItem('username');
    this.http.post<any>('http://localhost:5000/auth/logout',{}, {withCredentials: true}).subscribe({
      next: (v: any) => {
        showResponseSuccess(v.message)
      }
    });
    this.router.navigate([
      '/'
    ]);
  }

  updateTotal(item: CartItem){
    const token = this.authService.getToken();
    const updateItem:UpdateCartItem = {
      cartDto: {
        username: this.authService.getUsername(),
        createAt: this.cart?.createAt!,
      },
      bookName: item.title,
      quantity: item.quantity,
      cartItemId: item.cartItemId
    }

    this.updateCart = this.cartService.updateCart(this.cart?.cartId!,
      updateItem,token).subscribe((data) => {
          console.log(data);
      });
     this.total = this.cart?.cartItems.reduce((acc, item) => {
      return acc + (Number(item.price) * Number(item.quantity));
    }, 0)!;
  }

  getCartsUsername(){
    const username = localStorage.getItem('username')!;
   this.getCarts = this.cartService.getCartByUsername(username).subscribe((data)=>{
      this.cart = data.data ?? this.cart;  
    this.total = this.cart?.cartItems.reduce((acc, item) => {
      return acc + (Number(item.price) * Number(item.quantity));
    }, 0)!;
     });
  }
}