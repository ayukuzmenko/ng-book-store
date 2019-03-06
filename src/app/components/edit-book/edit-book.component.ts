import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from "@angular/router";
import { BooksService } from "../../services/books.service";
import { Book } from 'src/app/models/Book';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book = {
    name: ``,
    author: ``,
    description: ``,
    links: [ {
      type: ``, 
      link: ``
    }],
    price: 0,
    date: ``,
  };

  constructor(
    public booksService: BooksService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.bookId = this.activatedRoute.snapshot.params[`id`];
    this.booksService.getBookById(this.bookId).subscribe((book: Book) => {
      this.book = book;
    })
  }

  editBook() {
    const updateBook = Object.assign({}, this.book);
    this.booksService.editBook(this.bookId, updateBook).then(() => {
      this.router.navigate([`/panel`]);
      this.flashMessage.show(`data saved successfully`, {
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
