import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Invoice } from '../../../entity/Invoice';
import { Subscription } from 'rxjs';
import { canSelectedInvoiceStatus, getInvoiceStatusInfo, getStatusInvoices } from '../../../utils/invoice.utils';
import { showResponseFailure, showResponseSuccess } from '../../response/sweetAlert';
import { InvoiceService } from '../../../service/invoice.service';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class AdminInvoiceComponent implements OnInit {
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
  totalPages: number = 1;
  loading = false;

  constructor() {
    this.getInvoices = new Subscription();
    this.updateInvoice = new Subscription();
  }

  ngOnInit(): void {
    this.loadInvoices(this.currentPage);
  }

  loadInvoices(page: number) {
    this.loading = true;
    this.getInvoices.unsubscribe();
    this.getInvoices = this.invoiceService
      .getInvoices(page, this.size)
      .subscribe((data) => {
        this.invoices = data.data.content || [];
        this.currentPage = page!;
        this.totalPages = data.data.totalPages;
        this.loading = false;
      });
  }

  setPage(page: number) {
    if (page < 1) return;
    if (page > this.totalPages) return;
    if (page === this.currentPage) return;

    this.loadInvoices(page);
  }

  getStatusInvoice(status: string) {
    return getInvoiceStatusInfo(status);
  }

  getStatusInvoices() {
    return getStatusInvoices();
  }

  startEdit(invoice: Invoice) {
    this.editInvoiceId = invoice.invoiceId;
    this.originStatus = invoice.paymentStatus;
    this.editedStatus = invoice.paymentStatus;
  }

  cancelEdit() {
    this.editInvoiceId = null;
    this.originStatus = null;
    this.editedStatus = null;
  }

  canSelectedStatus(current: string, target: string) {
    return canSelectedInvoiceStatus(current, target);
  }

  handleSearch() {
    if (!this.txtSearch) return this.loadInvoices(this.page);

    this.invoices = this.invoices.filter(
      invoice => invoice.invoiceCode.match(this.txtSearch)
    )
  }

  update(invoiceId: number){
    this.updateInvoice.unsubscribe();
    this.updateInvoice = this.invoiceService.updateInvoice(invoiceId, this.editedStatus!).subscribe(
      {
        next: (data) => {
          showResponseSuccess(data.message);
          this.cancelEdit();
          this.loadInvoices(this.page);
        }
        ,
        error: (err) => {
          showResponseFailure(err.message);
        }
      }
    );
  }
}
