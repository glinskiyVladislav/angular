export interface CheckoutItem {
  id: string,
  price: null;
  name: string;
  sum: number;
  count: number;
}

export interface Order {
  id?: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  items: CheckoutItem[];
  total: number;
  isEdit?: boolean;
}
