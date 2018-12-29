import { Component, OnInit } from '@angular/core';
import { Book } from "../../models/Book";
import { BooksService } from "../../services/books.service";
//@Получить состояние роутера NOTE: ActivatedRoute - что б получать параметры Router что б навигейтисться
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string;
  book: Book;
  constructor(
    public bookService: BooksService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    //@Получить состояние роутера - 'id' это то что мы указывали в роутинге
    this.bookId = this.activatedRoute.snapshot.params['id'];
    // this.bookService.getBookById(this.bookId).subscribe((book: Book) => this.book = book);
  }

  editBook() {
    const updateBook = Object.assign({}, this.book);
    this.bookService.editBook(updateBook).subscribe((book: Book) => {
      if (book) {
        //@Получить состояние роутера -- перенаправление
        this.router.navigate(['/panel']);
      }
    })
  }
}
