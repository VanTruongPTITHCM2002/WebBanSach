import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    let username = null;
    if (typeof window !== 'undefined'){
       username = localStorage.getItem('username'); 
    }
    return username === 'admin' ? true: this.router.parseUrl('/login'); 
  }
}