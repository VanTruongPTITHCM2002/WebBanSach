import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, Validators } from "@angular/forms";
import { showResponseFailure, showResponseSuccess } from "../../response/sweetAlert";
import { HttpClient, HttpClientModule, HttpStatusCode } from "@angular/common/http";
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
export class AdminLoginComponents{
   
     constructor(private http:HttpClient,
        private router: Router,
       
      ){}
 

    onSubmit(form: NgForm) {
            if (!form.valid) {
                console.log("Error.....");
                form.control.markAllAsTouched();
                return;
            }
            const { username, password } = form.value;
            this.http.post(`${enviroment.API_ROUTE}/auth/login`, { username, password },{withCredentials: true}).subscribe({
                next: (v: any) => {
                    console.log(v.statusCode);
                    if(v.statusCode !== HttpStatusCode.Ok) return showResponseFailure(v.message);
                    showResponseSuccess(v.message)
                    if (typeof window !== undefined) {
                         localStorage.setItem('username',username);
                    }
                    this.router.navigate(['/admin/dashboard'])
                },
                error: (e) => {
                    showResponseFailure(e.error.message);
                }
            })
        
    }
}