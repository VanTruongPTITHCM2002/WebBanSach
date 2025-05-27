import { ResponseData } from './../app/response/ResponseData';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Publisher } from '../entity/Publisher';


@Injectable({
    providedIn: 'root'
})
export class PublisherService{
    constructor(private http: HttpClient){}

    getPublishers(): Observable<ResponseData<Publisher[]>>{
      return this.http.get<any>('http://localhost:5000/publishers');
    }

}