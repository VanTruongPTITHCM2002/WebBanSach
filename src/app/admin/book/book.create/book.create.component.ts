import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, BookResponse } from '../../../../entity/Book';
import { Category } from '../../../../entity/Category';
import { Author } from '../../../../entity/Author';
import { Publisher } from '../../../../entity/Publisher';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { CategoryService } from '../../../../service/CategoryService';
import { PublisherService } from '../../../../service/PublisherService';
import { BookService } from '../../../../service/BookService';
import { AuthorService } from '../../../../service/AuthorService';

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
  constructor(private location: Location, private authorService: AuthorService,
    private categoryService: CategoryService, private publisherService: PublisherService,
    private bookService: BookService
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
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.book.image = reader.result?.toString(); // base64 string để gửi về backend
    };
    reader.readAsDataURL(file);
  }
}

goBack(){
  this.location.back();
}


}
