import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Order, CheckoutItem } from 'src/app/models/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private salesService: SalesService
  ) { }

  ngOnInit() {
    // get all orders
    this.salesService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  changeCount(order, item) {
    order.isEdit = true;
    item.sum = item.price * item.count;    
  }

  deleteItem(item) {
    
  }

  changeStatus(order){

  }

  saveChanges(order) {
    if (!order.isEdit) {
      order.isEdit = !order.isEdit
    } else {
      this.salesService.updateOrder(order);
    }

  }
}
