import { Pipe, PipeTransform } from '@angular/core';
import { getNumberOfCurrencyDigits } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, locale?: any, format?: any): any {
    const date = new Date(value.seconds  * 1000);
    switch(format) {
      case 'full':
        return date.toLocaleString(locale, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit'});
      case 'short':
        return date.toLocaleString(locale, {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit'});
      default:
        return date.toLocaleString(locale);
    }
    return null;
  }

}
