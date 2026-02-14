import { isPlatformBrowser } from "@angular/common";
import { Inject, inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router = inject(Router);
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private plaformId: object) {
    this.isBrowser = isPlatformBrowser(this.plaformId);
  }

  canActivate(): boolean | UrlTree {
    let username: string = '';
    if (this.isBrowser){
       username = localStorage.getItem('username') ?? username; 
    }
    return username === 'admin' ? true: this.router.parseUrl('/login'); 
  }
}