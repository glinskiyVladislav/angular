//@Создание сервиса для работы с заказом
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Order } from "../models/Order";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  ordersCollection: AngularFirestoreCollection<Order>;
  orderDoc: AngularFirestoreDocument<Order>;
  orders: Observable<Order[]>;
  order: Observable<Order>;

  constructor(
    public afs: AngularFirestore
  ) {
    this.ordersCollection = this.afs.collection('orders');
  }

  getOrders() {
    return this.orders = this.ordersCollection.snapshotChanges().pipe(map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Order;
        data.id = document.payload.doc.id;

        return data
      });
    }));
  }

  addNewOrder(order) {
    return this.ordersCollection.add(order);
  }
}
