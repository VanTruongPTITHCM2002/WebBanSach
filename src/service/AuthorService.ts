import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Author } from "../entity/Author";
import { ResponseData } from "../app/response/ResponseData";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
    providedIn: 'root'
})
export class AuthorService{
    constructor(private http: HttpClient){}

    getAuthors(page: number = 1, size: number = 5): Observable<ResponseData<Author[]>>{
      return this.http.get<any>(`http://localhost:5000/authors?page=${page}&size=${size}`);
    }

}