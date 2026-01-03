import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../service/OrderService';
import { Order } from '../../../entity/Order';
import { getOrderMethodPay, getOrderStatusInfo , getStatusOrders, canSelectedOrderStatus} from '../../../utils/order.utils';
import { RouterLink } from '@angular/router';
import { showResponseFailure, showResponseSuccess } from '../../response/sweetAlert';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  getOrders: Subscription;
  currentPage: number = 1;
  page: number = 1;
  size: number = 5;
  isLastPage: boolean = false;
  txtSearch: string = '';
  editOrderId: number | null = null;
  originalStatus: number | null = null;
  editedStatus: number | null = null;
  updateOrderSub: Subscription;
  loading: boolean = false;
  totalPages: number = 1;

  constructor(private orderService: OrderService) {
    this.getOrders = new Subscription();
    this.updateOrderSub = new Subscription();
  }

  ngOnInit(): void {
    this.loadOrders(this.currentPage);
  }

  loadOrders(page: number) {
    this.getOrders.unsubscribe();
    this.getOrders = this.orderService
      .getOrders(page, this.size)
      .subscribe((data) => {
        this.orders = data.data.content || [];
        this.currentPage = page!;
        this.totalPages = data.data.totalPages;
        this.loading = false;
      });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;
    this.loadOrders(page);
  }

  getStatus(status: number) {
    return getOrderStatusInfo(status);
  }

  getStatusOrder() {
    return getStatusOrders();
  }

  canSelectedStatus(current: number, target: number) {
    return canSelectedOrderStatus(current, target);
  }

  handleSearch() {
    if (!this.txtSearch) return this.loadOrders(this.page);

    this.orders = this.orders.filter(
      (order) =>
        order.fullName.match(this.txtSearch) ||
        order.username.match(this.txtSearch) ||
        order.totalAmount.toString().match(this.txtSearch) ||
        getOrderMethodPay(order.methodPay).match(this.txtSearch)
    );
    this.currentPage = this.page;
    this.isLastPage = this.orders.length < this.size;
  }

  startEdit(order: any) {
    this.editOrderId = order.orderId;
    this.originalStatus = order.status;
    this.editedStatus = order.status;
  }

  cancelEdit() {
    this.editOrderId = null;
    this.originalStatus = null;
    this.editedStatus = null;
  }

  update(orderId: number) {
    this.updateOrderSub?.unsubscribe();
    this.updateOrderSub = this.orderService
      .updateOrder(orderId, this.editedStatus!)
      .subscribe({
        next: (data) => {
          showResponseSuccess(data.message);

          this.cancelEdit();
          this.loadOrders(this.page);
        },
        error: (err) => {
          showResponseFailure(err.message);
        },
      });
  }
}
