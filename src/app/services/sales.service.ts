import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  public ordersCollection: AngularFirestoreCollection<Order>;
  public orderDoc: AngularFirestoreDocument<Order>;
  public orders: Observable<Order[]>;
  public order: Observable<Order>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.ordersCollection = this.afs.collection('orders');
   }

   getOrders() {
     return this.orders = this.ordersCollection.snapshotChanges().map(collection => {
       return collection.map(document => {
        const data = document.payload.doc.data() as Order;
        data.id = document.payload.doc.id;
        return data;
       })
     })
   }

  addNewOrder(order) {
    return this.ordersCollection.add(order);
  }
}
