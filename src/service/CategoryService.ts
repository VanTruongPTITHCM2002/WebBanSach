import { Category } from './../entity/Category';
import { ResponseData } from './../app/response/ResponseData';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Book } from '../entity/Book';

@Injectable({
    providedIn: 'root'
})
export class CategoryService{
    constructor(private http: HttpClient){}

    getCategories(page: number = 1, size: number = 5): Observable<ResponseData<Category[]>>{
      return this.http.get<any>(`http://localhost:5000/categories?page=${page}&size=${size}`);
    }

    getBooksByCategory(id: number): Observable<ResponseData<Book[]>>{
      return this.http.get<any>(`http://localhost:5000/categories/${id}`);
    }

    addCategory(categoryName: string): Observable<ResponseData<Category>>{
      return this.http.post<any>(`http://localhost:5000/categories`,{
        categoryName: categoryName
      },{withCredentials: true})
    }

    updateCategory(categoryId: number, categoryName: string):Observable<ResponseData<Category>>{
      return this.http.patch<any>(`http://localhost:5000/categories/${categoryId}`,{
        categoryName: categoryName
      },{withCredentials: true})
    }

    deleteCategory(categoryId: number):Observable<ResponseData<string>>{
      return this.http.delete<any>(`http://localhost:5000/categories/${categoryId}`,{withCredentials: true});
    }
}