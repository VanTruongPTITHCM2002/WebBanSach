import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Invoice } from '../../../entity/Invoice';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../../../service/InvoiceService';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class AdminInvoiceDetailComponent implements OnInit{
    invoice: Invoice | null = null;
    getInvoice: Subscription;

    constructor(private route: ActivatedRoute, private invoiceService: InvoiceService){
      this.getInvoice = new Subscription();
    }
  ngOnInit(): void {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    this.getInvoice = this.invoiceService.getInvoiceById(Number(invoiceId)).subscribe((data) => {
      this.invoice = data.data ?? null
    });
  }

  
}
