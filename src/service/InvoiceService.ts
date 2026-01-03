import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Invoice } from "../entity/Invoice";
import { ResponseData } from "../app/response/ResponseData";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    constructor(private http:HttpClient){}

    getInvoices(page: number, size: number): Observable<any>{
            return this.http.get<any>(`http://localhost:5000/invoice?page=${page}&size=${size}`,{withCredentials: true});
        }
    
    updateInvoice(invoiceId: number, status: string): Observable<ResponseData<Invoice>>{
        return this.http.patch<any>(`http://localhost:5000/invoice/${invoiceId}`, {status: status}, {withCredentials: true});
    }

    getInvoiceById (invoiceId: number): Observable<ResponseData<Invoice>>{
        return this.http.get<any>(`http://localhost:5000/invoice/${invoiceId}`, {withCredentials: true});
    }
}