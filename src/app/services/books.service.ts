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
    return new Observable((observer) => {
      this.booksCollection.doc(id).get().subscribe(doc => {
        observer.next(doc.data());
      });
    });
  }

  addBook(book: Book) {
    return this.booksCollection.add(book);
  }

  editBook(bookId, book: Book) {
    delete book.isAddBasket;
    delete book.id;
    return this.booksCollection.doc(bookId).update(book);
  }

  deleteBookById(id: string) {
    return this.booksCollection.doc(id).delete();
  }
}
