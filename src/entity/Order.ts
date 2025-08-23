import { OrderDetail } from "./OrderDetail";

export interface Order{
    orderId: number,
    username: string;
    fullName: string
    orderdetails?: OrderDetail[];
    orderDate: Date,
    totalAmount: number,
    methodPay: string,
    status: number
}

export interface CreateOrderDto {
    username: string,
    orderDate: Date,
    totalAmount: number,
    methodPay: string,
}