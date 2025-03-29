import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{
  title = '';
  constructor(private router: Router){}
  ngOnInit(): void {
    this.title = history.state.title;
  }
}
