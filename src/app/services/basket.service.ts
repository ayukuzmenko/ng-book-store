import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Book } from '../models/Book';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  public purchaseList: Book[] = [];

  private clearSource = new BehaviorSubject<boolean>(false);
  public clearAllItemEvent = this.clearSource.asObservable();

  private deleteSource = new BehaviorSubject(``);
  public deleteItemEvent = this.deleteSource.asObservable();

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
   // уведомить все компоненты
    this.deleteSource.next(id);
  }

  clearBasketAll() {
    // this.purchaseList =[];
    this.purchaseList.splice(0, this.purchaseList.length);
     // уведомить все компоненты
     this.clearSource.next(true);
  }
}
