import { CommonModule, Location } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Book, BookCreate, BookResponse } from '../../../../entity/Book';
import { Category } from '../../../../entity/Category';
import { Author } from '../../../../entity/Author';
import { Publisher } from '../../../../entity/Publisher';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { CategoryService } from '../../../../service/CategoryService';
import { PublisherService } from '../../../../service/PublisherService';
import { BookService } from '../../../../service/BookService';
import { AuthorService } from '../../../../service/AuthorService';
import { showResponseFailure, showResponseSuccess } from '../../../response/sweetAlert';
import { Router } from '@angular/router';


@Component({
  selector: 'admin-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.create.component.html',
  styleUrl: './book.create.component.css'
})
export class BookCreateComponent implements OnInit{
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  getCategories: Subscription;
  getAuthors: Subscription;
  getPublishers: Subscription;
  selectedFile?: File;
  router = Inject(Router);
  constructor(private location: Location, private authorService: AuthorService,
    private categoryService: CategoryService, private publisherService: PublisherService,
    private bookService: BookService,
    private authService: AuthService,
    // private router: Router,
  ){
    this.getCategories = new Subscription();
    this.getAuthors = new Subscription();
    this.getPublishers = new Subscription();
  }
  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.getAuthors = this.authorService.getAuthors().subscribe((data) =>
        this.authors = data.data ?? []
      ),
      this.getPublishers = this.publisherService.getPublishers().subscribe((data) =>
        this.publishers = data.data ?? []
      ),
      this.getCategories = this.categoryService.getCategories().subscribe((data) =>
        this.categories = data.data ?? []
      )
    ]);
  }

 book: BookResponse = {
  bookid: 0,
  title: '',
  price: 0,
  stock: 0,
  status: true,
  image: '',
  imageBase64: '',
  authorId: {
    authorId: 0,
    firstname: '',
    lastname: '',
    country: '',
    quantity: 0,
  },
  publisherId: {
    publisherId: 0,
    publisherName:'',
    publisherAddress: ''
  },
  category: {
    categoryId: 0,
    categoryName: ''
  }
};

pageSize = 5;
currentPage = 1;

get pagedAuthors() {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.authors.slice(start, start + this.pageSize);
}

get totalPages() {
  return Math.ceil(this.authors.length / this.pageSize);
}

publisherPage = 1;


get pagedPublishers() {
  const start = (this.publisherPage - 1) * this.pageSize;
  return this.publishers.slice(start, start + this.pageSize);
}

get totalPublisherPages() {
  return Math.ceil(this.publishers.length / this.pageSize);
}

categoryPage = 1;

get pagedCategories() {
  const start = (this.categoryPage - 1) * this.pageSize;
  return this.categories.slice(start, start + this.pageSize);
}

get totalCategoryPages() {
  return Math.ceil(this.categories.length / this.pageSize);
}


onImageChange(event: any) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

goBack(){
  this.location.back();
}

onSubmit (form: NgForm){
  if (!form.invalid){
      const formData = form.value;

    const formDATA = new FormData();
    formDATA.append('title', formData.title);
    formDATA.append('authorName', formData.authorName);
    formDATA.append('categoryName', formData.categoryName);
    formDATA.append('publisherName', formData.publisherName);
    formDATA.append('price', formData.price.toString());
    formDATA.append('stock', formData.stock.toString());

    if (this.selectedFile) {
       formDATA.append('image',this.selectedFile);
    }
      this.bookService.createBook(formDATA).subscribe({
        next: (value) => {
            showResponseSuccess(value.message);
            this.router.navigate(['/admin/books']);
        },
        error(err) {
            showResponseFailure(err.message);
        },
      })
  }
}

}
