import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Currency } from '../models/Currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public currency: Currency[] = [
    {
      name: 'USD',
      isActive: true,
      coefficient: 1
    },
    {
      name: 'GBP',
      isActive: false,
      coefficient: 0.5
    },
    {
      name: 'EUR',
      isActive: false,
      coefficient: 0.8
    }
  ]

  private currencySource = new BehaviorSubject<Currency[]>(this.currency);
  public selectedCurrency = this.currencySource.asObservable();

  constructor() { }

  selectCurrency(name: string) {
    this.currency = this.currency.map((item: Currency) => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    this.currencySource.next(this.currency);
  }
}
