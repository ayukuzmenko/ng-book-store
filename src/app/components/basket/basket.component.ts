import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketItem = [];

  constructor(
    private basketService: BasketService
  ) { }

  ngOnInit() {
    // get basket
    this.basketService.getBusketItem().subscribe(items => {
      this.basketItem = items;
    });
  }

  clearBasket() {
    // this.basketItem = [];
    this.basketService.clearBasketAll();
  }

  deleteBasketItem(id) {
    this.basketService.deleteItem(id);
  }
}
