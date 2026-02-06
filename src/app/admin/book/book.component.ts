import { HttpClient } from '@angular/common/http';
import { Component, ErrorHandler, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../entity/Book';
import { BookService } from '../../../service/book.service';
import {
  catchError,
  forkJoin,
  retry,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  showResponseFailure,
  showResponseSuccess,
} from '../../response/sweetAlert';
import Swal from 'sweetalert2';
import { Category } from '../../../entity/Category';
import { Author } from '../../../entity/Author';
import { Publisher } from '../../../entity/Publisher';
import { AuthorService } from '../../../service/author.service';
import { ResponseData } from '../../response/ResponseData';
import { CategoryService } from '../../../service/category.service';
import { PublisherService } from '../../../service/publisher.service';

interface BookFilter {
  title?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  stock?: number;
  categoryId?: number;
  authorId?: number;
  publisherId?: number;
}

@Component({
  selector: 'admin-book',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrl: './book.component.css',
  templateUrl: './book.component.html',
})
export class AdminBookComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  books: Book[] = [];
  categories: {
    categoryId: string;
    name: string;
  }[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  page: number = 1;
  size: number = 5;
  txtSearch = '';
  filterStatus: boolean | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  stock: number | null = null;
  status: string | null = null;
  categoryId: number | null = null;
  authorId: number | null = null;
  publisherId: number | null = null;
  isLastPage = false;
  totalPages: number = 1;
  currentPage = 1;
  pageSize = 5;
  loading = false;
  isOpen = false;
  query: BookFilter = {};
  objectLength: number = 1;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.loadBooks(1);
    this.loadInitData();
  }

  loadInitData() {
    forkJoin({
      authors: this.authorService.getAuthors(),
      publishers: this.publisherService.getPublishers(),
      categories: this.categoryService.getCategoriesNotPaginate(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ authors, publishers, categories }) => {
        this.authors = authors.data.content ?? [];
        this.publishers = publishers.data.content ?? [];
        this.categories = categories.data ?? [];
      });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;
    this.loadBooks(page);
  }

  loadBooks(page: number = 1) {
    this.loading = true;
    const filters = this.buildFilters();

    this.bookService
      .getFilterBooks(page, this.pageSize, filters)
      // .pipe(
      //   retry(2),
      //   catchError(error => {

      //   })
      // )
      .subscribe({
        next: (res) => {
          this.books = res.data.content ?? [];
          this.currentPage = page;
          this.totalPages = res.data.totalPages ?? 1;
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }

  handleRefresh() {
    this.loadBooks(this.currentPage);
  }

  handleSearch() {
    this.page = 1;
    this.query.title = this.txtSearch.trim();
    this.loadBooks();
  }

  handleChange() {}

  deleteBook(bookId: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookService.deleteBook(bookId).subscribe({
          next: (v: ResponseData<any>) => {
            showResponseSuccess(v.message);
            this.loadBooks();
          },
          error: (e: ResponseData<any>) => {
            showResponseFailure(e.message);
          },
        });
      }
    });
  }

  buildFilters(): BookFilter {
    this.query = {
      ...(this.txtSearch.trim() && { title: this.txtSearch.trim() }),
      ...(this.minPrice !== null && { minPrice: this.minPrice }),
      ...(this.maxPrice !== null && { maxPrice: this.maxPrice }),
      ...(this.status && { status: this.status }),
      ...(this.stock !== null && { stock: this.stock }),
      ...(this.categoryId && { categoryId: this.categoryId }),
      ...(this.authorId && { authorId: this.authorId }),
      ...(this.publisherId && { publisherId: this.publisherId }),
    };
    return this.query;
  }

  clearFilters() {
    this.txtSearch = '';
    this.minPrice = this.maxPrice = this.stock = null;
    this.status = null;
    this.categoryId = this.authorId = this.publisherId = null;
    this.loadBooks(1);
  }

  applyFilters() {
    this.loadBooks(1);
  }
}
