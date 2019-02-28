import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Order } from 'src/app/models/Order';

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

  changeStatus(order){

  }

  saveChanges(order) {

  }
}
