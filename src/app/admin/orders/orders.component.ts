import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../service/OrderService';
import { Order } from '../../../entity/Order';
import { getOrderMethodPay, getOrderStatusInfo } from '../../../utils/order.utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class AdminOrdersComponent implements OnInit{
    orders: Order[] = [];
    getOrders: Subscription;
    currentPage: number = 1;
    page: number = 1;
    size: number = 5;
    isLastPage:boolean = false;
    txtSearch: string = '';

    constructor(private orderService: OrderService){
      this.getOrders = new Subscription();
    }

    ngOnInit(): void {
      this.loadOrders(this.currentPage);
    }

    loadOrders(page: number){
      this.getOrders.unsubscribe();
      this.getOrders = this.orderService.getOrders(page, this.size).subscribe((data) => {
        this.orders = data.data || [];
        this.currentPage = page;
        this.isLastPage = this.orders.length < this.size;
      });
    }

     setPage(page: number){
    if (page < 1) return;
    if (page === this.currentPage) return;
    if (this.isLastPage && page > this.currentPage) return;

    this.loadOrders(page);
  }

  getStatus(status: number){
    return getOrderStatusInfo(status);
  }

  handleSearch(){
    if (!this.txtSearch) return this.loadOrders(this.page);

    this.orders = this.orders.filter(order => order.fullName.match(this.txtSearch)
      || order.username.match(this.txtSearch) 
      || order.totalAmount.toString().match(this.txtSearch)  || getOrderMethodPay(order.methodPay).match(this.txtSearch)
  )
    this.currentPage = this.page;
    this.isLastPage = this.orders.length < this.size;
  }
}
