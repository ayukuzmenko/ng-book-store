import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public purchaseList: Book[] = [];

  constructor() { }

  getBusketItem() {
    return of(this.purchaseList);
  }

  addItem(book) {
    this.purchaseList.push(book);
    return of(book);
  }

  deleteItem(id) {
    this.purchaseList.forEach((item, i) => {
      if (item.id === id) {
        this.purchaseList.splice(i, 1);
      }
    });
  }
}
