import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Book } from "../../../entity/Book";
import { BookService } from "../../../service/BookService";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../auth/auth.service";
import { showResponseFailure, showResponseSuccess } from "../../response/sweetAlert";
import Swal from "sweetalert2";

@Component({
    selector: 'admin-book',
    standalone: true,
    imports:[CommonModule, RouterLink, FormsModule],
    styleUrl: './book.component.css',
    templateUrl:'./book.component.html'
})
export class AdminBookComponent implements OnInit{
    books:Book[] = [];
    page: number = 1;
    size: number = 5;
    txtSearch = '';
    getBooksPage: Subscription;
    delete: Subscription;
    filterStatus: boolean | null = null;
    minPrice: number | null = null;
    maxPrice: number | null = null;
    isLastPage = false;  
    currentPage = 1;
    pageSize = 5;
    constructor(private bookService: BookService, private authService: AuthService){
        this.getBooksPage = new Subscription();
        this.delete = new Subscription();
    }
    
    ngOnInit(): void {
       this.loadBooks(this.currentPage);
    }
 
    setPage(page: number) {
        if (page < 1) return; // Không cho trang nhỏ hơn 1
        if (page === this.currentPage) return; // Không reload trang hiện tại
        if (this.isLastPage && page > this.currentPage) return; // Nếu là trang cuối rồi, không sang trang tiếp theo

        this.loadBooks(page);
    }
    

  loadBooks(page: number) {
    this.getBooksPage.unsubscribe(); // Hủy subscribe cũ nếu có
    this.getBooksPage = this.bookService.getBooks(page, this.pageSize).subscribe(data => {
      this.books = data.data || [];
      this.currentPage = page;
      // Nếu số bản ghi trả về < pageSize => đây là trang cuối
      this.isLastPage = this.books.length < this.pageSize;
    });
  }

  handleSearch(){
    if(this.txtSearch === '') this.loadBooks(this.page);
    this.books = this.books.filter(book => book.title.match(this.txtSearch));
  }

  handleChange(){
    if (this.getBooksPage) this.getBooksPage.unsubscribe();
    this.getBooksPage = this.bookService.getFilterBooks(this.page, this.pageSize, this.minPrice, this.maxPrice).subscribe(data => {
      this.books = data.data || [];
      this.currentPage = this.page;
      // Nếu số bản ghi trả về < pageSize => đây là trang cuối
     this.isLastPage = this.books.length < this.pageSize;

    });
  }

  deleteBook(bookId: number){
      Swal.fire({
          title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Có",
          denyButtonText: `Không`
      }).then((result) => {
          if (result.isConfirmed) {
              this.delete = this.bookService.deleteBook(bookId).subscribe({
                  next: (v: any) => {
                      showResponseSuccess(v.message)
                      this.books = this.books.filter((book) => book.bookid != bookId)
                  },
                  error: (e: any) => showResponseFailure(e.message)
              }
              )
          }
      });
    
  }
}