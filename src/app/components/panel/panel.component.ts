import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/Book";
import { CurrencyService } from "../../services/currency.service";
import { Currency } from "../../models/Currency";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit  {
  books: Book[];
  searchingResult: Book[] = [];
  searchText: string;
  currentCurrency: Currency;

  constructor(
    public bookService: BooksService,
    public currencyService: CurrencyService
  ) { }

  ngOnInit() {
    // Get all books @подписываться
    this.bookService.getBooks().subscribe((books: Book[]) => this.books = books);
    // Subscribe on currency update
    this.currencyService.selectedCurrency.subscribe(data => {
      this.currentCurrency = data.find(obj => obj.isActive);
    });
  }

  searchBook() {
  // @Реализация поиска
    this.searchingResult = this.books.filter( book => book.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 );
    console.log(this.searchingResult);
  }

}
