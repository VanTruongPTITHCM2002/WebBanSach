export enum OrderStatus {
  Pending = 0,
  Completed = 1,
  Processing = 2,
  Shipping = 3,
  Cancel = -1,
  Refund = 4
}

export function getOrderStatusInfo(status: number) {
  switch (status) {
    case OrderStatus.Pending:
      return { label: 'Mới', color: 'blue' };       // xanh dương
    case OrderStatus.Completed:
      return { label: 'Hoàn tất', color: 'green' }; // xanh lá
    case OrderStatus.Processing:
      return { label: 'Đang xử lý', color: 'orange' };
    case OrderStatus.Shipping:
      return { label: 'Đang giao', color: 'gold' }; // vàng
    case OrderStatus.Cancel:
      return { label: 'Hủy', color: 'red' };
    case OrderStatus.Refund:
      return { label: 'Hoàn tiền', color: 'purple' }; // tuỳ chọn thêm
    default:
      return { label: 'Không xác định', color: 'gray' };
  }
}

export function getOrderMethodPay(methodPay: string){
    if (methodPay === 'COD')
      return "Tiền mặt";
    return "Ngân hàng";
}