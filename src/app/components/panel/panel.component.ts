import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service'
import { Book } from 'src/app/models/Book';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/models/Currency';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public books: Book[];
  public searchingResult: Book[] = [];
  public searchText: string;
  public currentCurrency: Currency

  constructor(
    public booksService: BooksService,
    private currencyService: CurrencyService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get all books
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
    // subscribe on currency update
    this.currencyService.selectedCurrency.subscribe(data => {
      this.currentCurrency = Object.create(data.find(obj => obj.isActive));
    })
  }

  searchBook() {
    this.searchingResult = this.books.filter(book => book.name.toLowerCase().indexOf(this.searchText) !== -1);
  }

  onDelete(id) {
    this.booksService.deleteBookById(id)
    .then(() => {
      this.flashMessage.show(`data deleted successfully`, {
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
    );
  }
}
