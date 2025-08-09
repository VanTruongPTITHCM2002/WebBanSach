import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { showResponseFailure, showResponseSuccess } from '../../../response/sweetAlert';
import { Book, BookResponse, BookUpdate } from '../../../../entity/Book';
import { Subscription } from 'rxjs';
import { AuthorService } from '../../../../service/AuthorService';
import { CategoryService } from '../../../../service/CategoryService';
import { BookService } from '../../../../service/BookService';
import { PublisherService } from '../../../../service/PublisherService';
import { AuthService } from '../../../auth/auth.service';
import { Category } from '../../../../entity/Category';
import { Author } from '../../../../entity/Author';
import { Publisher } from '../../../../entity/Publisher';
import { ActivatedRoute, CanActivate } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
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
    country:'',
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
  categories: Category[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  getCategories: Subscription;
  getAuthors: Subscription;
  getBook: Subscription;
  getPublishers: Subscription;
  selectedFile?: File;
  constructor(private location: Location, private authorService: AuthorService,
    private categoryService: CategoryService, private publisherService: PublisherService,
    private bookService: BookService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ){
    this.getBook = new Subscription();
    this.getCategories = new Subscription();
    this.getAuthors = new Subscription();
    this.getPublishers = new Subscription();
    const id = this.route.snapshot.paramMap.get('id')!;
    this.getBook = this.bookService.getBookById(+id).subscribe((data) => {
      this.book = data.data!
      console.log(this.book)
    }
    )
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

 compareAuthors(a1: any, a2: any): boolean {
  return a1 && a2 ? a1.authorId === a2.authorId : a1 === a2;
}

 comparePublishers(a1: any, a2: any): boolean {
  return a1 && a2 ? a1.publisherId === a2.publisherId : a1 === a2;
}

 compareCategories(a1: any, a2: any): boolean {
  return a1 && a2 ? a1.categoryId === a2.categoryId : a1 === a2;
}

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

    const bookUpdate:BookUpdate =
    {
      title: this.book.title,
      authorName: this.book.authorId.firstname +  ' ' + this.book.authorId.lastname,
      publisherName: this.book.publisherId.publisherName,
      categoryName: this.book.category.categoryName,
      price: this.book.price,
      stock: this.book.stock,
      link: this.book.link,
    }
    // if (this.selectedFile) {
    //    formDATA.append('image',this.selectedFile);
    // }
      const id = this.route.snapshot.paramMap.get('id')!;
      this.bookService.updateBook(+id, bookUpdate).subscribe({
        next(value: any) {
            showResponseSuccess(value.message)
        },
        error(err: any) {
            showResponseFailure(err.message);
        },
      })
  }
}

}
