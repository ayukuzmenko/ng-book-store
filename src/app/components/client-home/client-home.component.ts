import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/Book';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  public books: Book[];

  constructor(
    private booksService: BooksService,
    private basketService: BasketService
  ) { }

  ngOnInit() {
    // get all books
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
    this.basketService.clearAllItemEvent.subscribe(status => {
      if (status) {
        this.books.forEach(book => {
          book.isAddBasket = false;
        })
      }
    });

    // subscribe on delete from basket
    this.basketService.deleteItemEvent.subscribe(id => {
      if (id) {
        this.books.forEach(book => {
          if (id == book.id) {
            book.isAddBasket = false;
          }
        });
      }
    });
  }

  addBook(book) {
    const newBasketItem = {
      id: book.id,
      price: book.price,
      name: book.name
    }

    this.basketService.addItem(newBasketItem).subscribe( book => {
      // show message
    })
  }

  deleteFromBasket(id) {
    this.basketService.deleteItem(id);
  }

}
