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

    constructor(private bookService: BookService){
        this.getBooksPage = new Subscription();
    }
    
    ngOnInit(): void {
        this.getBooksPage = this.bookService.getBooks().subscribe((data) =>{
            this.books = data.data ?? []}
        );
    }
    filteredBooks(): Book[] {
        return this.books.filter(book => {
            const matchStatus = this.filterStatus === null || book.status === this.filterStatus;
            const matchMinPrice = this.minPrice === null || book.price >= this.minPrice;
            const matchMaxPrice = this.maxPrice === null || book.price <= this.maxPrice;
            return matchStatus && (matchMinPrice && matchMaxPrice);
        });
}
    
}