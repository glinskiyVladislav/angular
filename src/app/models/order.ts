export interface CheckoutItem {
  id: string,
  price: null;
  name: string;
  sum: number;
  count: number;
}

export interface Order {
  name: string;
  email: string;
  phone: string;
  status: string;
  items: CheckoutItem[]
}
