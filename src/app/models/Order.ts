export interface CheckoutItem {
  id: string,
  price:number,
  name:string,
  sum: number,
  count: number
}


export interface Order {
  id?: string;
  name: string,
  email: string,
  phone: string,
  items: CheckoutItem[];
  total: number;
  isEdit?: string;
}