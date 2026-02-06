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

    getAuthors(page: number = 1, size: number = 5, query?: any): Observable<ResponseData<any>>{
      return this.http.get<any>(`http://localhost:5000/api/v1/authors?page=${page}&size=${size}`, {
        withCredentials: true,
        params: query,
      });
    }

    getAuthorNotPaginate(): Observable<ResponseData<any>>{
      return this.http.get<any>(`http://localhost:5000/api/v1/authors/select/infinity`);
    }

    addAuthor(data: any): Observable<ResponseData<Author>>{
      return this.http.post<any>(`http://localhost:5000/authors`, data, {withCredentials: true});
    }

    updateAuthor(authorId: string, author: any){
      return this.http.patch<any>(`http://localhost:5000/authors/${authorId}`,author,{withCredentials: true});
    }

    removeAuthor (authorId: string): Observable<ResponseData<Author>>{
      return this.http.delete<any>(`http://localhost:5000/authors/${authorId}`,{withCredentials:true});
    }
}