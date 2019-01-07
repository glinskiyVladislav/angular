//@Создание сервиса для работы с заказом
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Book } from "../models/Book";
import { Observable } from "rxjs";
import { Order } from "../models/order";

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

  addNewOrder(order) {
    return this.ordersCollection.add(order);
  }
}
