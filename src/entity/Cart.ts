export interface CartItem {
  cartItemId: number;
  quantity: number;
  price: number;
  title: string;
}

export interface Cart{
    cartId: number;
    createAt: string;
    status: boolean;
    cartItems: CartItem[];
}

export interface CartDTO{
    username: string;
    createAt?: string;
}

export interface CreateCartItem{
  cartDto: CartDTO;
  bookName:string;
  quantity: number;
}

export interface UpdateCartItem extends CreateCartItem{
  cartItemId: number;
}