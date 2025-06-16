import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector:'admin-dashboard',
    imports: [RouterLink],
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent{

    // constructor(
    //     private cookieService: CookieService,
    //     private router: Router
    // ){

    // }

    // logOut(){
    //     this.cookieService.delete('token','/');
    //     this.cookieService.delete('username','/');
    //     this.router.navigate([
    //         '/login'
    //     ]);
    // }
}