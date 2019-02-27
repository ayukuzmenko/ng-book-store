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
  }

  addBook(book) {
    const newBasketItem = {
      id: book.id,
      price: book.price,
      mame: book.name
    }

    this.basketService.addItem(newBasketItem).subscribe( book => {
      // show message
    })
  }

  deleteFromBasket(id) {
    this.basketService.deleteItem(id);
  }

}
