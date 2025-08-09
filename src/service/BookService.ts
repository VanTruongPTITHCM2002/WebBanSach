import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseData } from "../app/response/ResponseData";
import { Observable } from "rxjs";
import { Book, BookCreate, BookResponse, BookUpdate } from "../entity/Book";

@Injectable({
    providedIn: 'root'
})
export class BookService{
    constructor(private http: HttpClient){}
    
        getBooks(page: number = 1, size: number = 5): Observable<ResponseData<Book[]>>{
          return this.http.get<any>(`http://localhost:5000/books?page=${page}&size=${size}`);
        }

        getFilterBooks(page: number = 1, size: number = 5, minPrice: number | null = null,
           maxPrice: number | null = null){
          return this.http.get<any>(`http://localhost:5000/books/filter?page=${page}&size=${size}
            &minPrice=${minPrice}&maxPrice=${maxPrice}
            `,{withCredentials: true})
        }

        getBooksByBuys(): Observable<ResponseData<Book[]>>{
          return this.http.get<any>('http://localhost:5000/books/buys');
        }

        getBookById(id: number):Observable<ResponseData<BookResponse>>{
          return this.http.get<any>(`http://localhost:5000/books/${id}`)
        }

        createBook(bookCreate: FormData):Observable<ResponseData<BookResponse>>{
          return this.http.post<any>(`http://localhost:5000/books`,bookCreate,{
            withCredentials: true,
          });
        }

        updateBook(bookId: number ,bookUpdate: BookUpdate){
            return this.http.patch<any>(`http://localhost:5000/books/${bookId}`,bookUpdate,{
              withCredentials: true
          });
        }


        deleteBook(bookId: number): Observable<ResponseData<string>>{
          return this.http.delete<any>(`http://localhost:5000/books/${bookId}`,{
            withCredentials: true
          });
        }
}