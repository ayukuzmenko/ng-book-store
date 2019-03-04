import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private salesService: SalesService,
    private router: Router,
    private flashMessage: FlashMessagesService
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

  deleteItem(order, deletedItem) {
    order.items.forEach((item, index) => {
      if (item.id === deletedItem.id) {
        order.items.splice(index, 1);
      }
    });
    order.isEdit = !order.isEdit;
  }

  changeStatus(order) {
    order.isEdit = !order.isEdit;
  }

  saveChanges(order) {
    if (!order.isEdit) {
      order.isEdit = !order.isEdit
    } else {
      this.salesService.updateOrder(order)
      .then(() => {
        this.router.navigate([`/panel`]);
        this.flashMessage.show(`data saved successfully`, {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      })
      .catch( error => {
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      }
      )
    }

  }
}
