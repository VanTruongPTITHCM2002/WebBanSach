import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../../entity/Invoice';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../../../service/InvoiceService';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class AdminInvoiceComponent implements OnInit{
    invoices: Invoice[] = [];
    getInvoices: Subscription;
    currentPage: number = 1;
    page: number = 1;
    size: number = 5
    isLastPage: boolean = false;
    txtSearch: string = '';

    constructor(private invoiceService: InvoiceService){
      this.getInvoices = new Subscription();
    }
  ngOnInit(): void {
      this.loadInvoices(this.currentPage);
  }

    loadInvoices(page: number){
      this.getInvoices.unsubscribe();
      this.getInvoices = this.invoiceService.getInvoices(page, this.size).subscribe((data) => {
        this.invoices = data.data || [];
        this.currentPage = page;
        this.isLastPage = this.invoices.length < this.size;
      })
    }

  setPage(page: number) {
    if (page < 1) return;
    if (page === this.currentPage) return;
    if (this.isLastPage && page > this.currentPage) return;

    this.loadInvoices(page);
  }
}
