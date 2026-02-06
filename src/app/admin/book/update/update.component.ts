import { CommonModule, Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  showResponseFailure,
  showResponseSuccess,
} from '../../../response/sweetAlert';
import { Book, BookResponse, BookUpdate } from '../../../../entity/Book';
import { Subscription } from 'rxjs';
import { AuthorService } from '../../../../service/AuthorService';
import { CategoryService } from '../../../../service/CategoryService';
import { BookService } from '../../../../service/book.service';
import { PublisherService } from '../../../../service/PublisherService';
import { AuthService } from '../../../auth/auth.service';
import { Category } from '../../../../entity/Category';
import { Author } from '../../../../entity/Author';
import { Publisher } from '../../../../entity/Publisher';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  categories: {
    categoryId: number;
    name: string;
  }[] = [];
  authors: Author[] = [];
  publishers: Publisher[] = [];
  book = {
        bookid: 0,
        title: '',
        isDeleted: false,
        price: 0,
        stock:0,
        status: true,
        authorId: '',
        authorName: '',
        categoryName: '',
        categoryId: '',
        publisherName: '',
        publisherId: '',
        thumbnail: '',
        images: [],
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
    private route: ActivatedRoute,
  ) {

    const id = this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBookById(id).subscribe((data) => {
      this.book = data.data!;
      this.imagesList = this.book.images || [];
      this.thumbnail = this.book.thumbnail || '';
    });
  }
  async ngOnInit(): Promise<void> {
    await Promise.all([
      (this.authorService
        .getAuthorNotPaginate()
        .subscribe((data) => (this.authors = data.data ?? []))),
      (this.publisherService
        .getPublishersNotPaginate()
        .subscribe((data) => (this.publishers = data.data ?? []))),
      (this.categoryService
        .getCategoriesNotPaginate()
        .subscribe((data) => (this.categories = data.data ?? []))),
    ]);
  }

 
  onImageChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.handleFiles(Array.from(input.files));
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

      const bookUpdate = {
        title: formData.title,
        authorId: formData.authorName,
        categoryId: formData.categoryName,
        publisherId: formData.publisherName,
        price: Number(formData.price),
        stock: Number(formData.stock),
        images: this.imagesList,
        thumbnail: this.thumbnail,
      };
      // if (this.selectedFile) {
      //    formDATA.append('image',this.selectedFile);
      // }
      const id = this.route.snapshot.paramMap.get('id')!;
      this.bookService.updateBook(id, bookUpdate).subscribe({
        next: (value: any) => {
          showResponseSuccess(value.message);
          this.goBack();
        },
        error(err: any) {
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
