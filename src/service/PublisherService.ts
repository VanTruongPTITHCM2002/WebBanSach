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

    getPublishersNotPaginate(): Observable<ResponseData<any>> {
      return this.http.get<any>(`${PublisherService.API_URL}/publishers/list`);
    }

    getPublishersNotPaginateV2 () :  Observable<any> {
      return this.http.get<any>(`${PublisherService.API_URL}/publishers/list`);
    }

    addPublisher(publisher:Publisher):Observable<ResponseData<Publisher>>{
      return this.http.post<any>(`http://localhost:5000/api/v1/publishers`, publisher, {withCredentials: true});
    }

    updatePublisher (publiserId: string, publisher: Publisher): Observable<ResponseData<Publisher>>{
      return this.http.patch<any>(`http://localhost:5000/publishers/${publiserId}`,publisher,{withCredentials: true});
    }

    deletePublisher(publisherId: string):Observable<ResponseData<Publisher>>{
      return this.http.delete<any>(`http://localhost:5000/publishers/${publisherId}`,{withCredentials: true});
    }
}