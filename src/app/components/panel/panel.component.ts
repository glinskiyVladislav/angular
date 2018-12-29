import { Component, OnInit } from '@angular/core';
import { BooksService } from "../../services/books.service";
import { Book } from "../../models/Book";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit  {
  books: Book[];
  searchingResult: Book[] = [];
  searchText: string;

  constructor(
    public bookService: BooksService
  ) { }

  ngOnInit() {
    // Get all books @подписываться
    this.bookService.getBooks().subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  searchBook() {
  // @Реализация поиска
    this.searchingResult = this.books.filter( book => book.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 );
    console.log(this.searchingResult);
  }

}
