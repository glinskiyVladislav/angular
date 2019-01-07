//@Создать компоненту клиентской части - за вывод товара отвечает
import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/Book";
import { BasketService } from "../../services/basket.service";

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  books: Book[] = [];
  basketItems = [];

  constructor(
    public bookService: BooksService,
    public basketService: BasketService
  ) { }

  ngOnInit() {
    // Get basket items
    this.basketService.getBusketItem().subscribe(items => {
      if(items.length) {
        this.basketItems = items;
      }
    });

    // Get all books
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
      if(this.basketItems.length) {
        this.basketItems.forEach(item => {
          this.books.forEach(book => {
            if(book.id === item.id) {
              book.isAddBasket = true;
            }
          })
        })
      }
    });

    this.basketService.clearAllItemsEvent.subscribe(status => {
      if(status) {
        this.books.forEach(book => book.isAddBasket = false)
      }
    });
  //    subscribe on delete one book from basket
    this.basketService.deleteItemEvent.subscribe(id => {
      if(id) {
        this.books.forEach(book => {
          if(book.id === id) {
            book.isAddBasket = false;
          }
        });
      }
    });

  }

  addBook(book) {
    const newBasketItem = {
      id: book.id,
      price: book.price,
      name: book.name,
      sum: book.price,
      count: 1
    };

    this.basketService.addItem(newBasketItem).subscribe(book => {
      // show message

    });
  }
  deleteBookFromBasket(id) {
    this.basketService.deleteItem(id);
  }

}
