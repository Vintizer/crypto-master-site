import { OrdersStat, Order } from './../../../shared/types/ordersStat';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements OnInit {
  @Input() tableData: OrdersStat = { filledOrders: [], openOrders: [] };
  constructor() {}

  ngOnInit(): void {}
  countProfit(order: Order) {
    const { orderType, amount, priceExec, takePrice = 0 } = order;
    let val = 0;
    if (orderType === 'long') {
      val = (takePrice - priceExec) * amount;
    } else {
      val = (-takePrice + priceExec) * amount;
    }
    const perc = (val / priceExec / amount) * 100;
    return { val: val.toFixed(6), perc: perc.toFixed(2) };
  }
}
