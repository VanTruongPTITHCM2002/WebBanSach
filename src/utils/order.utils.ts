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
      return { label: 'Đang chờ', color: 'blue' };       // xanh dương
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

export function getStatusOrders (){
  return [
    { value: 0, label: 'Đang chờ' },
    { value: 1, label: 'Hoàn tất' },
    { value: 2, label: 'Đang xử lý' },
    { value: 3, label: 'Đang giao' },
    { value: -1, label: 'Hủy' },
    { value: 4, label: 'Hoàn tiền' }
  ];
}

export function getOrderMethodPay(methodPay: string){
    if (methodPay === 'COD')
      return "Tiền mặt";
    return "Ngân hàng";
}

export function canSelectedOrderStatus (current: number, target: number): boolean{
   if (current == target) return true;
   if (target == -1 ) return false;

     const order = [0, 2, 3, 1, 4];
  const currentIndex = order.indexOf(current);
  const targetIndex = order.indexOf(target);

  return targetIndex >= currentIndex; 
}