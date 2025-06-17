import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseData } from "../app/response/ResponseData";
import { Observable } from "rxjs";
import { Book, BookResponse } from "../entity/Book";

@Injectable({
    providedIn: 'root'
})
export class BookService{
    constructor(private http: HttpClient){}
    
        getBooks(page: number = 1, size: number = 5): Observable<ResponseData<Book[]>>{
          return this.http.get<any>(`http://localhost:5000/books?page=${page}&size=${size}`);
        }

        getBooksByBuys(): Observable<ResponseData<Book[]>>{
          return this.http.get<any>('http://localhost:5000/books/buys');
        }

        getBookById(id: number):Observable<ResponseData<BookResponse>>{
          return this.http.get<any>(`http://localhost:5000/books/${id}`)
        }
}