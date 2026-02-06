import { CommonModule, Location } from '@angular/common';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Book, BookCreate, BookResponse } from '../../../../entity/Book';
import { Category } from '../../../../entity/Category';
import { Author } from '../../../../entity/Author';
import { Publisher } from '../../../../entity/Publisher';
import { AuthService } from '../../../auth/auth.service';
import { BookService } from '../../../../service/book.service';
import { AuthorService } from '../../../../service/author.service';
import {
  showResponseFailure,
  showResponseSuccess,
} from '../../../response/sweetAlert';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../service/category.service';
import { PublisherService } from '../../../../service/publisher.service';

@Component({
  selector: 'admin-book-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.create.component.html',
  styleUrl: './book.create.component.css',
})
export class BookCreateComponent implements OnInit {
  categories: {
    categoryId: number;
    name: string;
  }[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  book: BookResponse = {
    bookid: 0,
    title: '',
    price: 0,
    stock: 0,
    status: true,
    images: [],
    thumbnail: '',
    authorId: '',
    authorName: '',
    categoryName: '',
    publisherName: '',
    publisherId: '',
    category: '',
  };
  pageSize = 5;
  currentPage = 1;
  selectedFile?: File;
  router = Inject(Router);
  images: File[] = [];
  imagesList: string[] = [];
  previewUrls: string[] = [];
  isDragOver = false;
  imageUrl = '';
  imageUrlPreview: string | null = null;
  thumbnailUrl = '';
  thumbnail = '';

  constructor(
    private location: Location,
    private authorService: AuthorService,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
    private bookService: BookService,
    private authService: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.authorService
        .getAuthorNotPaginate()
        .subscribe((data) => (this.authors = data.data ?? [])),
      this.publisherService
        .getPublishersNotPaginate()
        .subscribe((data) => (this.publishers = data.data ?? [])),
      this.categoryService
        .getCategoriesNotPaginate()
        .subscribe((data) => (this.categories = data.data ?? [])),
    ]);
  }

  onImageChange(event: any) {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //   this.selectedFile = input.files[0];
    // }
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.handleFiles(Array.from(input.files));
  }

  handleFiles(files: File[]) {
    files.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      this.images.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.focusFirstInvalid(form);
      return;
    }
    const formData = form.value;

    const payload = {
      title: formData.title,
      authorId: formData.authorName,
      categoryId: formData.categoryName,
      publisherId: formData.publisherName,
      price: Number(formData.price),
      stock: Number(formData.stock),
      images: this.imagesList,
      thumbnail: this.thumbnail,
    };

    this.bookService.createBook(payload).subscribe({
      next: (value) => {
        showResponseSuccess(value.message);
        this.goBack();
      },
      error(err) {
        showResponseFailure(err.message);
      },
    });
  }

  focusFirstInvalid(form: NgForm) {
    const controls = form.controls;

    for (const name in controls) {
      if (controls[name].invalid) {
        const invalidControl = document.querySelector(
          `[name="${name}"]`,
        ) as HTMLElement;

        if (invalidControl) {
          invalidControl.focus();
          invalidControl.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
        break;
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (!event.dataTransfer?.files) return;
    this.handleFiles(Array.from(event.dataTransfer.files));
  }

  setThumbnail() {
    console.log(this.thumbnailUrl);
    if (!this.isValidImageUrl(this.thumbnailUrl)) return;

    this.thumbnail = this.thumbnailUrl.trim();
    this.thumbnailUrl = '';
  }

  // Images
  addImageByUrl() {
    if (!this.isValidImageUrl(this.imageUrl)) return;

    const url = this.imageUrl.trim();
    if (this.imagesList.includes(url)) return;

    this.imagesList.push(url);
    console.log(this.imageUrl);
    this.imageUrl = '';
  }

  removeImage(index: number) {
    this.imagesList.splice(index, 1);
  }

  isValidImageUrl(url: string): boolean {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(url);
  }
}
