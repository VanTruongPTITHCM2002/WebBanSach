import { Component, inject, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { UserService } from "../../../service/user.service";
import { InvoiceService } from "../../../service/InvoiceService";
import { CurrencyPipe } from "@angular/common";
import { OrderService } from "../../../service/OrderService";

@Component({
    selector:'admin-dashboard',
    imports: [RouterLink, CurrencyPipe],
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit{
  
    numberOfUsers: number = 0;
    revenue: number = 0;
    orders: number = 0;
    userService = inject(UserService);
    invoiceService= inject(InvoiceService);
    orderService = inject(OrderService);
  
    ngOnInit(): void {
        this.userService.getNumberOfUsers().subscribe((data) => {
            this.numberOfUsers = data.data;
        });

        this.invoiceService.getTotalRevenue().subscribe((data) => {
            this.revenue = data.data;
        });

        this.orderService.getSumOrders().subscribe((data) => {
            this.orders = data.data;
        });
    }

}