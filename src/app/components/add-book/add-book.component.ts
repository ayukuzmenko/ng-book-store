import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Book } from 'src/app/models/Book';
import { Subscription } from 'rxjs/Subscription';
import { LINK_TYPE } from 'src/app/constants';
import { BooksService } from 'src/app/services/books.service';
import { IdService } from 'src/app/services/id.service';
import { Router} from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public bookForm: FormGroup;
  public book: Book;
  public bookFormSub: Subscription[] = [];
  public linkType = Object.values(LINK_TYPE);

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private idService: IdService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** Инициализация формы*/
 initForm(){
    this.bookForm = this.fb.group({
      price: 0,
      name: [],
      description: [],
      author: [],
      type: [this.linkType[0]],
      link: []
    });

    this.bookFormSub.push(this.bookForm.get(`name`).valueChanges.subscribe(value => {
      this.book = Object.assign({}, this.book, {name: value});
    }));
  }

  ngOnDestroy() {
    this.bookFormSub.forEach(sub => {
      sub.unsubscribe();
    });
  }

  addBook() {
     /** Добавить поддержку нескольких линков для книг **/
    const id = this.idService.generate();

    const newBook = {
      id: id,
      author: this.bookForm.controls[`author`].value,
      description: this.bookForm.controls[`description`].value,
      date: new Date(),
      price: this.bookForm.controls[`price`].value,
      links: [
        {
          type: this.bookForm.controls[`type`].value,
          link: this.bookForm.controls[`link`].value
        }
      ]
    };

    this.book = Object.assign({}, this.book, newBook);
    this.booksService.addBook(this.book).then(() => {
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
