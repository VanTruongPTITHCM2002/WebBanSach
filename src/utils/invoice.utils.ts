export enum PaymentStatus {
  UNPAID = 'Chưa thanh toán',
  PAID = 'Đã thanh toán',
  REFUNDED = 'Hoàn tiền',
}

export enum PaymentMethod {
  COD = 'Tiền mặt',
  BANK = 'Ngân hàng',
}


export function getInvoiceStatusInfo (status: string) {
    switch(status) {
        case PaymentStatus.UNPAID:
            return {label : PaymentStatus.UNPAID ,color: 'orange'};
        case PaymentStatus.PAID:
            return {label: PaymentStatus.PAID,color: 'green'};
        case PaymentStatus.REFUNDED:
            return {label: PaymentStatus.REFUNDED, color: 'red'};
        default: 
            return { label: 'Không xác định', color: 'gray' };
    }
}

export function getStatusInvoices (){
  return [
    { value:  PaymentStatus.UNPAID , label:  PaymentStatus.UNPAID},
    { value: PaymentStatus.PAID, label: PaymentStatus.PAID },
    { value: PaymentStatus.REFUNDED, label: PaymentStatus.REFUNDED}
  ];
}


export function getInvoicesMethodPay (methodPay: string) {
    if (methodPay === PaymentMethod.COD){
        return PaymentMethod.COD;
    }
    return PaymentMethod.BANK;
}

export function canSelectedInvoiceStatus (current: string, target:string){
    switch (current) {
      case PaymentStatus.UNPAID:
          if (target === PaymentStatus.PAID) {
            return true;
          }
          return false;
      case PaymentStatus.PAID:
          if (target === PaymentStatus.REFUNDED){
            return true;
          }
        return false;
      default:
        return false;
    }
}