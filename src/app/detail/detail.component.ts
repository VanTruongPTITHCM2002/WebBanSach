import { Category } from './../../entity/Category';
import { Component, OnInit, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../entity/Book';
import { CategoryService } from '../../service/CategoryService';
import { NgFor } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { SubDetailComponent } from "./sub-detail/sub-detail.component";
import { PublisherService } from '../../service/PublisherService';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, NgFor, SubDetailComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  id = '';
  books: Book[] = [];
  categorys: Category[] = [];
  categories: [
    {
      categoryId: string;
      name: string;
    }
  ] = [
    {
      categoryId: '',
      name: '',
    },
  ];
  publishers: [
    {
      publisherId: string;
      name: string;
    }
  ] = [
    {
      publisherId: '',
      name: '',
    },
  ];
  category: string = '';
  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthService,
    private publisherService: PublisherService
  ) {
    this.id = String(route.snapshot.paramMap.get('id'));
  }

  async ngOnInit() {
    this.categoryService.getBooksByCategory(Number(this.id)).subscribe({
      next: (v) => {
        this.books = v.data!;
      },
    });
    this.categoryService.getCategories().subscribe({
      next: (v) => {
        this.categorys = v.data!;
      },
    });

    this.publishers = await this.publisherService.getPublishersNotPaginate();
  }
  getNameCategory() {
    return this.categorys.find((v) => v.categoryId == Number(this.id))
      ?.categoryName;
  }
}
