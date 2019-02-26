import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Book } from "../models/Book";

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  public books: Book[] = [
    {
      id: `qwqweas-2312fdasf-3123rer-1drg5re3123sdsd23`,
      name: `Выразительный javascript`,
      author: `Marijn Haverbeke`,
      description: `Это книга рассказывает, как заставить компьютеры
      делать то, что вам от них нужно. Компьютеры сегодня так
      же распространены, как отвёртки – но содержат гораздо
      больше скрытых сложностей, и поэтому их сложнее
      понять и с ними сложнее работать. Для многих они
      остаются чуждыми, слегка угрожающими штуками.`,
      link: [
        {
          type: `epub`,
          link: `link`
        },
        {
          type: `pdf`,
          link: `link`
        }
      ]
    }
  ]

  constructor() { }

  getBooks() {
    return of(this.books);
  }

  getBookById(id: string) {
    const book = this.books.find( (book) => book.id === id);
    return of(book);
  }

  addBook(book: Book) {
    this.books.unshift(book);
    return of(book);
  }

  editBook(book: Book) {
    this.books = this.books.map(item => {
      if (book.id === item.id) {
        item = book;
      }
      return item;
    });
    return of(book);
  }

  deleteBookById(id: string) {

  }
}
