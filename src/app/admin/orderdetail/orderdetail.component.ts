import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../../../entity/Order';
import { OrderService } from '../../../service/order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderdetail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './orderdetail.component.html',
  styleUrl: './orderdetail.component.css',
})
export class AdminOrderdetailComponent implements OnInit {
  order: Order | null = null;
  getOrder: Subscription;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
    this.getOrder = new Subscription();
  }

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    this.getOrder = this.orderService
      .getOrderById(Number(orderId))
      .subscribe((data) => {
        this.order = data.data ?? null;
      });
  }
}
