import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthorService } from '../../../service/AuthorService';
import { Author } from '../../../entity/Author';
import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { showResponseFailure, showResponseSuccess } from '../../response/sweetAlert';
import { HttpStatusCode } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'admin-authors',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit{

  authors: Author[] = [];
  updateAuthor: Author = undefined!;
  getAuthors: Subscription;
  insertAuthor: Subscription;
  deleteAuthor: Subscription;
  changeAuthor: Subscription;
  page: number = 1;
  size: number = 5;
  currentPage: number = 1;
  txtSearch = '';
  isLastPage: boolean = false;
   @ViewChild('closeBtn',{static: false}) closeBtn!: ElementRef<HTMLButtonElement>;

  constructor(private authorService: AuthorService){
    this.getAuthors = new Subscription();
    this.insertAuthor = new Subscription();
    this.deleteAuthor = new Subscription();
    this.changeAuthor = new Subscription();
  }
  ngOnInit(): void {
    this.loadAuthors(this.currentPage);
  }

  loadAuthors(page: number){
      this.getAuthors.unsubscribe();
      this.getAuthors = this.authorService.getAuthors(page, this.size).subscribe((data) =>{
        this.authors = data.data || [];
        this.currentPage = page;
        this.isLastPage = this.authors.length < this.size;
      })
  }

  setPage(page: number){
    if (page < 1) return;
    if (page === this.currentPage) return;
    if (this.isLastPage && page > this.currentPage) return;
    this.loadAuthors(page);
  }

  onSubmit(form: NgForm){
      if(!form.invalid){
          const formData = form.value;

          const data = {
            firstname: formData.firstname,
            lastname: formData.lastname,
            country: formData.country,
            quantity: formData.quantity,
          }

          this.insertAuthor = this.authorService.addAuthor(data).subscribe({
            next(value) {
              if(value.statusCode !== HttpStatusCode.Created) return showResponseFailure(value.message);
                showResponseSuccess(value.message);
            },
            error(err) {
                showResponseFailure(err.message);
            },
          });
      }
  }

  handleDelete (authorId: number){
     Swal.fire({
              title: "Bạn có chắc chắn muốn xóa tác giả này?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: "Có",
              denyButtonText: `Không`
          }).then((result) => {
              if (result.isConfirmed) {
                  this.deleteAuthor = this.authorService.removeAuthor(authorId).subscribe({
                      next: (v: any) => {
                          if(v.statusCode !== HttpStatusCode.Ok) return showResponseFailure(v.message);
                          showResponseSuccess(v.message)
                          this.authors = this.authors.filter((author) => author.authorId != authorId)
                      },
                      error: (e: any) => showResponseFailure(e.message)
                  }
                  )
              }
          });
  }

  handleUpdate(author: Author){
    this.updateAuthor = {...author};
  }

  update(){
    const {authorId, ...rest} = this.updateAuthor;
    const newAuthor = rest;

    this.changeAuthor = this.authorService.updateAuthor(this.updateAuthor.authorId, newAuthor).subscribe({
      next: (value) => {
          showResponseSuccess(value.message);
          this.closeBtn.nativeElement.click();
          this.loadAuthors(this.page);
      },error(err) {
          showResponseFailure(err.message);
      },
    })
  }

  handleSearch (){
    if(!this.txtSearch) return this.loadAuthors(this.page);
    this.authors = this.authors.filter(author => (author.country.match(this.txtSearch) || author.firstname.match(this.txtSearch)
    || author.lastname.match(this.txtSearch) || author.quantity.toString() === this.txtSearch
  ))
   this.currentPage = this.page;
   this.isLastPage = this.authors.length < this.size;
  }
}
