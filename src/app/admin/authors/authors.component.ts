import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthorService } from '../../../service/author.service';
import { Author } from '../../../entity/Author';
import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  showResponseFailure,
  showResponseSuccess,
} from '../../response/sweetAlert';
import { HttpStatusCode } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-authors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css',
})
export class AuthorsComponent implements OnInit {
  authors: Author[] = [];
  author: Author = {
    id: '',
    firstname: '',
    lastname: '',
    country: '',
    quantity: 0,
  };
  getAuthors: Subscription;
  insertAuthor: Subscription;
  deleteAuthor: Subscription;
  changeAuthor: Subscription;
  page: number = 1;
  size: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize = 5;
  loading = false;
  txtSearch: string = '';
  isLastPage: boolean = false;
  query: any = {};
  @ViewChild('closeBtn', { static: false })
  closeBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('createForm') createForm!: NgForm;
  updateAuthor: Author = {
    id: '',
    firstname: '',
    lastname: '',
    country: '',
    quantity: 0,
  };

  constructor(private authorService: AuthorService) {
    this.getAuthors = new Subscription();
    this.insertAuthor = new Subscription();
    this.deleteAuthor = new Subscription();
    this.changeAuthor = new Subscription();
  }
  ngOnInit(): void {
    this.loadAuthors(this.currentPage);
  }

  loadAuthors(page: number) {
    this.getAuthors.unsubscribe();
    this.loading = true;
    this.getAuthors = this.authorService
      .getAuthors(page, this.size, this.query)
      .subscribe((data) => {
        this.authors = data.data.content || [];
        this.currentPage = page!;
        this.totalPages = data.data.totalPages || 1;
        this.loading = false;
      });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;
    this.loadAuthors(page);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      this.focusFirstInvalid(form);
      return;
    }
    const formData = form.value;

    const data = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      country: formData.country,
      quantity: formData.quantity,
    };

    this.insertAuthor = this.authorService.addAuthor(data).subscribe({
      next: (value) => {
        if (value.statusCode !== HttpStatusCode.Created)
          return showResponseFailure(value.message);
        form.resetForm();
        showResponseSuccess(value.message);
      },
      error: (err: unknown) => {
        if (err instanceof Error) {
          showResponseFailure(err.message);
        }
      },
    });
  }

  handleDelete(authorId: string) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa tác giả này?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Có',
      denyButtonText: `Không`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAuthor = this.authorService
          .removeAuthor(authorId)
          .subscribe({
            next: (v: any) => {
              if (v.statusCode !== HttpStatusCode.Ok)
                return showResponseFailure(v.message);
              showResponseSuccess(v.message);
              this.authors = this.authors.filter(
                (author) => author.id != authorId,
              );
            },
            error: (e: any) => showResponseFailure(e.message),
          });
      }
    });
  }

  handleUpdate(author: Author) {
    this.updateAuthor = { ...author };
  }

  update() {
    const { id, ...rest } = this.updateAuthor;
    const newAuthor = rest;

    this.changeAuthor = this.authorService
      .updateAuthor(this.updateAuthor.id, newAuthor)
      .subscribe({
        next: (value) => {
          showResponseSuccess(value.message);
          this.closeBtn.nativeElement.click();
          this.loadAuthors(this.page);
        },
        error(err) {
          showResponseFailure(err.message);
        },
      });
  }

  handleSearch() {
    this.page = 1;
    this.query.search = this.txtSearch.trim();
    this.loadAuthors(this.page);
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

  ngAfterViewInit() {
    const modalEl = document.getElementById('myModal');
    modalEl?.addEventListener('hidden.bs.modal', () => {
      this.createForm.resetForm();
    });
  }
}
