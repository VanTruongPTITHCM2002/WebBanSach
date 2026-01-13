import { ResponseData } from './../app/response/ResponseData';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Publisher } from '../entity/Publisher';


@Injectable({
    providedIn: 'root'
})
export class PublisherService{

    static API_URL = 'http://localhost:5000/api/v1';

    constructor(private http: HttpClient){}

    getPublishers(page: number = 1, size: number = 5, filters?: any): Observable<any>{
      return this.http.get<any>(`${PublisherService.API_URL}/publishers?page=${page}&size=${size}`,{
        withCredentials: true,
        params: filters
      });
    }

    async getPublishersNotPaginate() {
      try{
        const response = await fetch('http://localhost:5000/api/v1/publishers/list');

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'fetch publishers failed');
        }

        return result.data || [];

      }catch(error: unknown){

        if (error instanceof Error) {
            console.log(error.message);
        }
      }
    }

    getPublishersNotPaginateV2 () :  Observable<any> {
      return this.http.get<any>(`${PublisherService.API_URL}/publishers/list`);
    }

    addPublisher(publisher:Publisher):Observable<ResponseData<Publisher>>{
      return this.http.post<any>(`http://localhost:5000/publishers`, publisher, {withCredentials: true});
    }

    updatePublisher (publiserId: number, publisher: Publisher): Observable<ResponseData<Publisher>>{
      return this.http.patch<any>(`http://localhost:5000/publishers/${publiserId}`,publisher,{withCredentials: true});
    }

    deletePublisher(publisherId: number):Observable<ResponseData<Publisher>>{
      return this.http.delete<any>(`http://localhost:5000/publishers/${publisherId}`,{withCredentials: true});
    }
}