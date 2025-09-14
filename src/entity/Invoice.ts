import { InvoiceItem } from "./InvoiceItem";

export interface Invoice {
  invoiceId: number;
  invoiceCode: string;
  issueDate: string;          // hoặc Date
  subtotal: string;
  vatPercent: string;
  vatAmount: string;
  shippingFee: string;
  discountAmount: string;
  totalAmount: string;
  paymentStatus: string;
  paymentMethod: string;
  note: string;
  username: string;
  fullName: string;
  orderId: number;
  items: InvoiceItem[];
}