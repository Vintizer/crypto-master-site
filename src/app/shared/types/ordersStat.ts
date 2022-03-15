export interface Order {
  amount: number;
  priceExec: number;
  takePrice?: number;
  orderType: 'short' | 'long';
  humanId: string;
}
export interface OrdersStat {
  filledOrders: Array<Order>;
  openOrders: Array<Order>;
}
