//@Создать сервис корзны
import { Injectable } from '@angular/core';
import { Book } from "../models/Book";
import  { BehaviorSubject, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  purchaseList: Book[] = [];
  private clearSource = new BehaviorSubject(false);
  clearAllItemsEvent = this.clearSource.asObservable();

  private deleteSource = new BehaviorSubject('');
  deleteItemEvent = this.deleteSource.asObservable();

  constructor() { }

  getBusketItem() {
    // Мы передаем ссылку а не копируем то будет автоматом связан с компонентой
    // И при изменении масива данных это будет обновляться и в компоненте
    return of(this.purchaseList);
  }

  addItem(book) {
    this.purchaseList.push(book);
    return of(book);
  }

  deleteItem(id) {
    //delete item
    for(let i = 0; i < this.purchaseList.length; i++) {
      if(this.purchaseList[i].id === id) {
        this.purchaseList.splice(i,1);
        break;
      }
    }
    //уведомим все компоненты об удалении одной книги
    this.deleteSource.next(id);
  }

  clearBasketAll() {
    this.purchaseList.splice(0, this.purchaseList.length);
  //  Уведомить другие компоненты
    this.clearSource.next(true);
  }

}
