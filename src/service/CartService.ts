import { CreateCartItem, UpdateCartItem } from './../entity/Cart';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseData } from "../app/response/ResponseData";
import { Observable } from "rxjs/internal/Observable";
import { Cart } from "../entity/Cart";

@Injectable({
    providedIn: 'root'
})
export class CartService{
     constructor(private http: HttpClient){
      
     }

      getCartByUsername(username: string, token: string): Observable<ResponseData<Cart>>{
         token = 'Bearer ' + token;
      const headers = new HttpHeaders().set('Authorization', token);
               return this.http.get<any>(`http://localhost:5000/carts/${username}`,{
                  headers
               });
             }
    
      addCart(createCartItem: CreateCartItem,token:string){
         token = 'Bearer ' + token;
         const headers = new HttpHeaders().set('Authorization', token);
            return this.http.post<any>(`http://localhost:5000/cartitems`,createCartItem,{
               headers
            });
      }

      updateCart(cartItem: number,updateCartItem: UpdateCartItem, token: string){
            token = 'Bearer ' + token;
            const headers = new HttpHeaders().set('Authorization', token);
            return this.http.patch<any>(`http://localhost:5000/cartitems/${cartItem}`,updateCartItem,{
               headers
            });
      }
}