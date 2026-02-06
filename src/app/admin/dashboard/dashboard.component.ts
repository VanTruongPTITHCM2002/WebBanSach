import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { InvoiceService } from '../../../service/InvoiceService';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { OrderService } from '../../../service/order.service';
import { BookService } from '../../../service/book.service';
import { ChartjsComponent } from '@coreui/angular-chartjs';
@Component({
  selector: 'admin-dashboard',
  imports: [RouterLink, CurrencyPipe, NgForOf, NgIf, ChartjsComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  numberOfUsers: number = 0;
  revenue: number = 0;
  orders: number = 0;
  booksActive: number = 0;
  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  bookBestSelling: {
    bookId: string;
    title: string;
    totalSold: number;
  }[] = [];
  userService = inject(UserService);
  invoiceService = inject(InvoiceService);
  orderService = inject(OrderService);
  bookService = inject(BookService);

  revenueByDayMock = [
    { date: '2026-01-01', revenue: 1200000 },
    { date: '2026-01-02', revenue: 1800000 },
    { date: '2026-01-03', revenue: 950000 },
    { date: '2026-01-04', revenue: 2100000 },
    { date: '2026-01-05', revenue: 1750000 },
    { date: '2026-01-06', revenue: 2600000 },
    { date: '2026-01-07', revenue: 3000000 },
  ];

  revenueByMonthMock = [
    { month: 'Jan', revenue: 32000000 },
    { month: 'Feb', revenue: 28000000 },
    { month: 'Mar', revenue: 35000000 },
    { month: 'Apr', revenue: 30000000 },
    { month: 'May', revenue: 42000000 },
    { month: 'Jun', revenue: 38000000 },
    { month: 'Jul', revenue: 38000000 },
    { month: 'Aug', revenue: 38000000 },
  ];

  revenueByOrderStatusMock = [
    { status: 'COMPLETED', revenue: 85000000 },
    { status: 'CANCELLED', revenue: 12000000 },
    { status: 'REFUNDED', revenue: 5000000 },
  ];

  labels = this.revenueByDayMock.map((d) => d.date);
  data = this.revenueByDayMock.map((d) => d.revenue);

  lablesMonth = this.revenueByMonthMock.map((d) => d.month);
  dataMonth = this.revenueByMonthMock.map((d) => d.revenue);

  chartData = {
    labels: this.labels,
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: this.data,
      },
    ],
  };

  chartDateMonth = {
    labels: this.lablesMonth,
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: this.dataMonth,
      },
    ],
  };

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

    this.bookService.getActiveBooks().subscribe((data) => {
      this.booksActive = data.data;
    });

    this.orderService.getTopFiveBooksBestSelling().subscribe((data) => {
      this.bookBestSelling = data.data;
    });
  }
}
