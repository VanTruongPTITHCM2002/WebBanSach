import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../../service/AuthorService';
import { Author } from '../../../entity/Author';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'admin-authors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit{

  authors: Author[] = [];
  getAuthors: Subscription;
  page: number = 1;
  size: number = 5;
  currentPage: number = 1;
  isLastPage: boolean = false;

  constructor(private authorService: AuthorService){
    this.getAuthors = new Subscription();
  }
  ngOnInit(): void {
    this.loadAuthors(this.currentPage);
  }

  loadAuthors(page: number){
      this.getAuthors.unsubscribe();
      this.getAuthors = this.authorService.getAuthors(page, this.size).subscribe((data) =>{
        this.authors = data.data || [];
        this.currentPage = page;
        this.isLastPage = this.authors.length < this.size;
      })
  }

  setPage(page: number){
    if (page < 1) return;
    if (page === this.currentPage) return;
    if (this.isLastPage && page > this.currentPage) return;
    this.loadAuthors(page);
  }
}
