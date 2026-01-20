import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    static API_USER_URL = 'localhost:5000';
    httpClient = inject(HttpClient);

    getNumberOfUsers(): Observable<any> {
        return this.httpClient.get<any>(`${UserService.API_USER_URL}/users/number-of-users`);
    }
}