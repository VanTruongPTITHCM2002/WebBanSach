import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Book } from "../../../entity/Book";
import { BookService } from "../../../service/BookService";
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'admin-book',
    standalone: true,
    imports:[CommonModule],
    styleUrl: './book.component.css',
    templateUrl:'./book.component.html'
})
export class AdminBookComponent implements OnInit{
    books:Book[] = [];
    page: number = 1;
    size: number = 5;
    getBooksPage: Subscription;

    constructor(private bookService: BookService){
        this.getBooksPage = new Subscription();
    }
    
    ngOnInit(): void {
        this.getBooksPage = this.bookService.getBooks().subscribe((data) =>{
            this.books = data.data ?? []}
        );
    }

}