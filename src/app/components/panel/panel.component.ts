import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service'
import { Book } from 'src/app/models/Book';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public books: Book[];

  constructor(
    public booksService: BooksService
  ) { }

  ngOnInit() {
    // get all books
    this.booksService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

}
