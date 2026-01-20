import { HttpClient, HttpParams } from "@angular/common/http";
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
          return this.http.get<any>(`http://localhost:5000/api/v1/books?page=${page}&size=${size}`);
        }

        getFilterBooks(page: number = 1, size: number = 5, filters: any){
          let params = new HttpParams();

        if (filters.status !== undefined && filters.status !== '') {
          params = params.set('status', String(filters.status));
        }

        if (filters.minPrice !== undefined && filters.minPrice !== '') {
          params = params.set('minPrice', String(filters.minPrice));
        }

        if (filters.maxPrice !== undefined && filters.maxPrice !== '') {
          params = params.set('maxPrice', String(filters.maxPrice));
        }

        if (filters.title) {
          params = params.set('title', filters.title);
        }

        if (filters.categoryId) {
          params = params.set('categoryId', String(filters.categoryId));
        }

        if (filters.authorId) {
          params = params.set('authorId', String(filters.authorId));
        }

        if (filters.publisherId) {
          params = params.set('publisherId', String(filters.publisherId));
        }

        if (filters.stock){
           params = params.set('stock', String(filters.stock));
        }
          return this.http.get<any>(`http://localhost:5000/api/v1/books/filter?page=${page}&size=${size}`,
            {
              withCredentials: true, 
              params
            });
        }

        getBooksByBuys(): Observable<ResponseData<Book[]>>{
          return this.http.get<any>('http://localhost:5000/api/v1/books/buys');
        }

        getBookById(id: number):Observable<ResponseData<BookResponse>>{
          return this.http.get<any>(`http://localhost:5000/api/v1/books/${id}`)
        }

        getBooksSearchSuggestions(name: string): Observable<ResponseData<string[]>> {
          return this.http.get<any>(`http://localhost:5000/api/v1/books/search-suggestions?name=${name}`);
        }

        createBook(bookCreate: FormData):Observable<ResponseData<BookResponse>>{
          return this.http.post<any>(`http://localhost:5000/api/v1/books`,bookCreate,{
            withCredentials: true,
          });
        }

        updateBook(bookId: number ,bookUpdate: BookUpdate){
            return this.http.patch<any>(`http://localhost:5000/api/v1/books/${bookId}`,bookUpdate,{
              withCredentials: true
          });
        }


        deleteBook(bookId: number): Observable<ResponseData<string>>{
          return this.http.delete<any>(`http://localhost:5000/api/v1/books/${bookId}`,{
            withCredentials: true
          });
        }

        getActiveBooks (): Observable<any>{
          return this.http.get<any>(`http://localhost:5000/api/v1/books/active`);
        }
}