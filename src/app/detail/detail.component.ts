import { Category } from './../../entity/Category';
import { Component, OnInit, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../entity/Book';
import { CategoryService } from '../../service/CategoryService';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { SubDetailComponent } from "./sub-detail/sub-detail.component";
import { PublisherService } from '../../service/PublisherService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [RouterLink, NgFor, SubDetailComponent, NgIf, CurrencyPipe, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent implements OnInit {
  id = '';
  books: Book[] = [];
  categorys: Category[] = [];
  categories: {
    categoryId: string;
    name: string;
  }[] = [];
  publishers: {
    publisherId: string;
    name: string;
  }[] = [];
  selectedPublisher: number = 0;

  category: string = '';
  size: number = 10;
  totalPages: number = 1;
  currentPage = 1;
  loading: boolean = false;
  sort: 'min' | 'max' | 'new' = 'new';
  selectedPrice: {
    min: number | null;
    max: number | null;
    label: string;
  } | null = {
    min: null,
    max: null,
    label: '',
  };

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private authService: AuthService,
    private publisherService: PublisherService
  ) {
    // this.id = String(route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';

      if (this.id) {
        this.loadData();
      }
    });
  }

  loadData() {
    this.categoryService
      .getBooksByCategory(+this.id, this.currentPage, this.size, this.sort,
         this.selectedPublisher,
        this.selectedPrice?.min, this.selectedPrice?.max
      )
      .subscribe({
        next: (v) => {
          this.books = v.data?.content || [];
          this.totalPages = v.data.totalPages;
          this.currentPage = v.data.page;
          this.loading = false;
        },
      });

    this.publisherService.getPublishersNotPaginateV2().subscribe({
      next: (value) => {
        this.publishers = value.data || [];
      },
    });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;

    this.currentPage = page;

    this.loadData();
  }

  handleFilter() {
    this.loadData();
  }

  handleSort() {
    this.loadData();
  }

  getNameCategory() {
    // return this.categorys.find((v) => v.categoryId == Number(this.id))
    //   ?.categoryName;
  }
}
