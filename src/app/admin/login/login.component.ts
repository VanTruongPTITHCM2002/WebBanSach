import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { showResponseSuccess } from "../../response/sweetAlert";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../../auth/auth.service";
import { Router } from "@angular/router";
import { enviroment } from "../../../enviroment";

@Component({
    selector: 'admin-login',
    standalone: true,
    imports: [FormsModule, CommonModule, HttpClientModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class AdminLoginComponents {
     constructor(private http:HttpClient,
        private cookieService: CookieService, 
        private router: Router,
        private authService: AuthService
      ){}

    onSubmit(form: NgForm) {
        if (form.valid) {
            const { username, password } = form.value;

            console.log(username, password);

            this.http.post(`${enviroment.API_ROUTE}/auth/login`, { username, password }).subscribe({
                next: (v: any) => {
                    showResponseSuccess(v.message)
                    this.authService.login(v.data?.access_token, username);
                    this.router.navigate(['/admin/dashboard'])
                },
                error: (e) => alert(e.error.message),
            })
        }

    }
}