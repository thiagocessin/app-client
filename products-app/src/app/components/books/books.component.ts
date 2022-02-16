import { Book } from './../../model/book';
import { Observable } from 'rxjs';
import { BookService } from './../../services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books$: Observable<Book[]> = new Observable<Book[]>();

  constructor(private bookService: BookService) {

  }

  ngOnInit(): void {
    this.books$ = this.bookService.books$;
  }

}
