import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from '../../../entity/Book';
import { BookService } from '../../../service/BookService';
import { Subscription } from 'rxjs';
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
import { AuthorService } from '../../../service/AuthorService';
import { CategoryService } from '../../../service/CategoryService';
import { PublisherService } from '../../../service/PublisherService';

@Component({
  selector: 'admin-book',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  styleUrl: './book.component.css',
  templateUrl: './book.component.html',
})
export class AdminBookComponent implements OnInit {
  books: Book[] = [];
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  getCategories: Subscription;
  getAuthors: Subscription;
  getPublishers: Subscription;
  page: number = 1;
  size: number = 5;
  txtSearch = '';
  getBooksPage: Subscription;
  delete: Subscription;
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
  query: any = {};
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private publisherService: PublisherService
  ) {
    this.getBooksPage = new Subscription();
    this.getCategories = new Subscription();
    this.getAuthors = new Subscription();
    this.getPublishers = new Subscription();
    this.delete = new Subscription();
  }

  async ngOnInit(): Promise<void> {
    this.loadBooks(this.currentPage);
    await Promise.all([
      (this.getAuthors = this.authorService
        .getAuthors()
        .subscribe((data) => (this.authors = data.data ?? []))),
      (this.getPublishers = this.publisherService
        .getPublishers()
        .subscribe((data) => (this.publishers = data.data ?? []))),
      (this.getCategories = this.categoryService
        .getCategories()
        .subscribe((data) => (this.categories = data.data ?? []))),
    ]);
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;

    this.loadBooks(page);
  }

  loadBooks(page?: number) {
    const filters = this.buildFilters();
    this.loading = true;
    this.getBooksPage.unsubscribe();
    this.getBooksPage = this.bookService
      .getFilterBooks(page, this.pageSize, filters)
      .subscribe((data) => {
        this.books = data.data.content || [];
        this.currentPage = page!;
        this.totalPages = data.data.totalPages;
        this.loading = false;
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
        this.delete = this.bookService.deleteBook(bookId).subscribe({
          next: (v: any) => {
            showResponseSuccess(v.message);
            this.books = this.books.filter((book) => book.bookid != bookId);
          },
          error: (e: any) => showResponseFailure(e.message),
        });
      }
    });
  }

  private buildFilters() {
    if (this.txtSearch?.trim()) {
      this.query.title = this.txtSearch.trim();
    }

    if (this.minPrice !== undefined && this.minPrice !== null) {
      this.query.minPrice = this.minPrice;
    }

    if (this.maxPrice !== undefined && this.maxPrice !== null) {
      this.query.maxPrice = this.maxPrice;
    }

    if (this.status !== null) {
      this.query.status = this.status;
    }

    if (this.stock !== null && this.stock !== undefined) {
      this.query.stock = this.stock;
    }

    if (this.categoryId !== null && this.categoryId !== undefined) {
      this.query.categoryId = this.categoryId;
    }

    if (this.authorId !== null && this.authorId !== undefined) {
      this.query.authorId = this.authorId;
    }

    if (this.publisherId !== null && this.publisherId !== undefined) {
      this.query.publisherId = this.publisherId;
    }

    return this.query;
  }

  clearFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.status = null;
    this.query = {};
    this.stock = null;
    this.page = 1;
    this.authorId = null;
    this.categoryId = null;
    this.publisherId = null;
    this.loadBooks(this.page);
  }

  applyFilters() {
    this.page = 1;
    this.loadBooks();
  }
}
