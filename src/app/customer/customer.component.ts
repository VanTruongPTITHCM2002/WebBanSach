import { Component } from "@angular/core";
import { EmployeeService } from "../employee/employee.service";
import { AuthService } from "../auth/auth.service";
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'customer-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule
    ,FormsModule,HeaderComponent, FooterComponent
  ],
    templateUrl: './customer.component.html',
    template: '<app-category></app-category>',
    styleUrl: './customer.component.css',
    providers: [EmployeeService, AuthService]

})
export class CustomerLayoutComponent {

}