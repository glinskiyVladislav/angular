import { Injectable } from '@angular/core';
// @Оператор of - эмулирует обсервбл как будто мы подписываемся на получение каких то данных
import { of } from "rxjs";

import { Book } from "../models/Book";
// @Работа с базой данной . Подключение
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class BooksService {
  // @Работа с базой данной . Инициализация
  // Методы для работы в первых двух переменных
  booksCollection: AngularFirestoreCollection<Book>;
  bookDoc: AngularFirestoreDocument<Book>;
  books: Observable<Book[]>;
  book: Observable<Book>;




  //@Модель данных
  // books: Book[] = [
  //   {
  //     id: 'sdasfd',
  //     name: 'Имя',
  //     author: 'KROT',
  //     description: 'asdas',
  //     link: [
  //       {
  //         type: 'esa',
  //         link: 'esa link'
  //       },
  //       {
  //         type: 'pdf',
  //         link: 'pdf link'
  //       },
  //     ]
  //   }
  // ];

  constructor(
    // @Работа с базой данной . Инициализация
    private  afs: AngularFirestore
  ) {
    // @Работа с базой данной . Инициализация . books это с бд
    this.booksCollection = this.afs.collection('books');
  }

  getBooks() {
    //@Оператор of пример - теперь когда мы будем @подписываться то будет как бы сервер
    // return of(this.books);

    // snapshotChanges - состояние колекции переберать нужно map на каждой итерации
    // получаем колекции и в них перебирать документы
    this.books = this.booksCollection.snapshotChanges().pipe(map(collection => {
      return collection.map(document => {
        const data = document.payload.doc.data() as Book;
        data.id = document.payload.doc.id;

        return data;
      });
    }));

    return this.books;
  }

  getBookById(id: string) {
    // const book = this.books.find(book => book.id === id);
    // return of(book);
  }

  addBook(book: Book) {

  }

  editBook(book: Book) {
    // this.books = this.books.map(item => {
    //   if(item.id === book.id) {
    //     item = book;
    //   }
    //   return item;
    // });
    return of(book);
  }

  deleteBook(id: string) {

  }
}
