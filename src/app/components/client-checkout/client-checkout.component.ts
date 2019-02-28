import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.css']
})
export class ClientCheckoutComponent implements OnInit {
  public checkoutlist;
  name = '';
  email = '';
  phone = '';
  public adressVisible = false;
  totalSum: number = 0;

  constructor(
    private basketService: BasketService,
    private router: Router,
    private salesService: SalesService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get all basket items
    this.basketService.getBusketItems().subscribe(items => {
      if (!items.length) {
        this.router.navigate(['/'])
      } else {
        this.checkoutlist = items;
        this.totalSum = this.checkoutlist.reduce((sum, item) => sum += item.price, 0);
      }
    });
  }

  onChangeItemCount(item) {
    item.sum = item.price * item.count;
    this.totalSum = this.checkoutlist.reduce((sum, item) => sum += item.sum, 0);
  }

  deleteItem(id) {
    this.basketService.deleteItem(id);
  }

  onSubmit() {
    const newOrder = {
      name: this.name,
      phone: this.phone,
      email: this.email,
      items: this.checkoutlist,
      satus: `processing`,
      total: this.totalSum
    };
    
    this.salesService.addNewOrder(newOrder)
      .then(() => {
        this.router.navigate(['/']);
        this.basketService.clearBasketAll();
        this.flashMessage.show(`Your order is completed. We will contact you soon.`, {
          cssClass: 'alert-success',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      })
      .catch(error => {
        // show message error
        this.flashMessage.show(error.message, {
          cssClass: 'alert-danger',
          showCloseBtn: true,
          closeOnClick: true,
          timeout: 10000
        });
      })
  }
}
