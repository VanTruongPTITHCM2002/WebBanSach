import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseData } from "../app/response/ResponseData";
import { Observable } from "rxjs";
import { Book } from "../entity/Book";

@Injectable({
    providedIn: 'root'
})
export class BookService{
    constructor(private http: HttpClient){}
    
        getBooks(): Observable<ResponseData<Book[]>>{
          return this.http.get<any>('http://localhost:5000/books');
        }
}