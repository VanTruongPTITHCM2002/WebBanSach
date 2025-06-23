import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Book } from "../../../entity/Book";
import { BookService } from "../../../service/BookService";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

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
    getBooksPage: Subscription;
    filterStatus: boolean | null = null;
    minPrice: number | null = null;
    maxPrice: number | null = null;
    isLastPage = false;
    constructor(private bookService: BookService){
        this.getBooksPage = new Subscription();
    }
    
    ngOnInit(): void {
       this.loadBooks(this.currentPage);
    }
    filteredBooks(): Book[] {
        return this.books.filter(book => {
            const matchStatus = this.filterStatus === null || book.status === this.filterStatus;
            const matchMinPrice = this.minPrice === null || book.price >= this.minPrice;
            const matchMaxPrice = this.maxPrice === null || book.price <= this.maxPrice;
            return matchStatus && (matchMinPrice && matchMaxPrice);
        });
}
    
    currentPage = 1;
    pageSize = 5;


    get paginatedBooks() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.filteredBooks().slice(start, start + this.pageSize);
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
      console.log(this.books)
      // Nếu số bản ghi trả về < pageSize => đây là trang cuối
      this.isLastPage = this.books.length < this.pageSize;
    });
  }

}