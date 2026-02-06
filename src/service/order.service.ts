import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseData } from "../app/response/ResponseData";
import { Order } from "../entity/Order";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    static readonly API_ORDER_URL = 'localhost:5000';
    constructor(private http:HttpClient){}

    getOrders(page: number, size: number): Observable<any>{
        return this.http.get<any>(`http://localhost:5000/orders?page=${page}&size=${size}`,{withCredentials: true});
    }

    getOrderById(orderId: number): Observable<ResponseData<Order>>{
        return this.http.get<any>(`http://localhost:5000/orders/${orderId}`, {withCredentials: true});
    }

    updateOrder(orderId: number, status: number):Observable<ResponseData<Order>>{
        return this.http.patch<any>(`http://localhost:5000/orders/${orderId}`, {status: status}, {withCredentials: true});
    }

    getSumOrders (): Observable<any>{
        return this.http.get<any>(`${OrderService.API_ORDER_URL}/orders/sum`);
    }

    getTopFiveBooksBestSelling (): Observable<any>{
        return this.http.get<any>(`${OrderService.API_ORDER_URL}/orderdetail/top/books`);
    }
}