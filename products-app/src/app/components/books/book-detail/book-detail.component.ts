import { BookService } from './../../../services/book.service';
import { Book } from './../../../model/book';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book$: Observable<Book> = new Observable<Book>();
  index: number | undefined;
  authors: string[] | undefined;


  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    this.book$ = this.route.paramMap
      .pipe(
        tap((params:ParamMap)=> this.index = Number(params.get('index'))),
        switchMap((params:ParamMap)=>this.bookService.get(Number(params.get('index')))),
        tap((b=> this.authors = (b) ?  b.authors : []))
        );

     // .subscribe((params:ParamMap) => this.book$ = this.bookService.get(Number(params.get('index'))));
  }

  remove(){
    if(this.index){
      this.bookService.remove(this.index);
      this.router.navigate(['books']);
    }
  }

  goAuthors(){
    let url = `/books/${this.index}/authors`;

    this.router.navigate([url,{authors:this.authors}]);

  }

}
