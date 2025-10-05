import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../../entity/Invoice';
import { Subscription } from 'rxjs';
import { InvoiceService } from '../../../service/InvoiceService';
import { canSelectedInvoiceStatus, getInvoiceStatusInfo, getStatusInvoices } from '../../../utils/invoice.utils';

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
  editInvoiceId: number | null = null;
  private invoiceService = inject(InvoiceService);
  originStatus: string | null = null;
  editedStatus: string | null = null;
  updateInvoice: Subscription;

  constructor() {
    this.getInvoices = new Subscription();
    this.updateInvoice = new Subscription();
  }

  ngOnInit(): void {
    this.loadInvoices(this.currentPage);
  }

  loadInvoices(page: number) {
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

  getStatusInvoice(status: string) {
    return getInvoiceStatusInfo(status);
  }

  getStatusInvoices(){
    return getStatusInvoices();
  }

  startEdit (invoice: Invoice) {
    this.editInvoiceId = invoice.invoiceId;
    this.originStatus = invoice.paymentStatus;
    this.editedStatus = invoice.paymentStatus;
  }

  cancelEdit () {
    this.editInvoiceId = null;
    this.originStatus = null;
    this.editedStatus = null;
  }

  canSelectedStatus(current: string, target: string) {
    return canSelectedInvoiceStatus(current, target);
  }

  handleSearch(){
    if (!this.txtSearch) return this.loadInvoices(this.page);

    this.invoices = this.invoices.filter(
      invoice => invoice.invoiceCode.match(this.txtSearch) 
    )
  }
}
