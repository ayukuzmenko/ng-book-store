import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Book } from "../models/Book";
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BooksService {
  public booksCollection: AngularFirestoreCollection<Book>;
  public bookDoc: AngularFirestoreDocument<Book>;
  public books: Observable<Book[]>;
  public book: Observable<Book>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.booksCollection = this.afs.collection( 'books');
  }

  getBooks() {
    this.books = this.booksCollection.snapshotChanges().map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Book;
        data.id = document.payload.doc.id;
        return data;
      })
    });

    return this.books
  }

  getBookById(id: string) {
    // const book = this.books.find( (book) => book.id === id);
    return of(book);
  }

  addBook(book: Book) {
    // this.books.unshift(book);
    return of(book);
  }

  editBook(book: Book) {
    // this.books = this.books.map(item => {
    //   if (book.id === item.id) {
    //     item = book;
    //   }
    //   return item;
    // });
    return of(book);
  }

  deleteBookById(id: string) {

  }
}
