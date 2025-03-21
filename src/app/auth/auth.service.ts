import { ElementRef, Injectable, Input, input, OnDestroy, Renderer2 } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
 
  constructor(private el: ElementRef, private cookieService: CookieService, private renderer: Renderer2) {}
  
  get isAuthenticated(): boolean {
    return !!this.cookieService.get('token');
  }

 

}
