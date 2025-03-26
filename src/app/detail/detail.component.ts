import { Category } from './../../entity/Category';
import { Component, OnInit, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../entity/Book';
import { CategoryService } from '../../service/CategoryService';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink,NgFor],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  id =''
  books:Book[] =[];
  categorys: Category[] = [];
  category: string = '';
  constructor(private route: ActivatedRoute,private categoryService: CategoryService) {
    this.id = String(route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
   this.categoryService.getBooksByCategory(Number(this.id)).subscribe({
     next: (v) => {
      this.books = v.data!
    },
  })
  this.categoryService.getCategories().subscribe({
    next: (v) => {
     this.categorys = v.data!
   }})
}
  getNameCategory(){
    return this.categorys.find((v) => v.categoryId == Number(this.id))?.categoryName;
  }
}
