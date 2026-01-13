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
    
    static API_URL = 'http://localhost:5000/api/v1/categories';
    constructor(private http: HttpClient){}

    getCategories(page: number = 1, size: number = 5, search?: string): Observable<ResponseData<any>>{
      return this.http.get<any>(`http://localhost:5000/api/v1/categories?page=${page}&size=${size}&search=${search}`);
    }

   async getCategoriesNotPaginate() {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/categories/list'
        );

        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to fetch categories');
        }

        return result.data;
      } catch (error: unknown) {

        if (error instanceof Error) {
          console.log(error.message);
        }

      }
   
    }

    getBooksByCategory(id: number, page: number, size: number, sort?: string): Observable<any>{
      return this.http.get<any>(`http://localhost:5000/api/v1/categories/${id}?page=${page}&size=${size}&sort=${sort}`);
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