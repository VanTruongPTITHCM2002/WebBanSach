import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Category } from '../../entity/Category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy {
    category: Category[] = [];
    constructor(private cookieService:CookieService,private httpClient: HttpClient){}
  ngOnInit(): void {
    this.httpClient.get('http://localhost:5000/categories').subscribe((data: any) => {
      this.category = data.data;
    });
    console.log(this.category);
  }
  ngOnDestroy(): void {
  
  }
  
}
