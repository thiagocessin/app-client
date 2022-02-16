import { Book } from './../model/book';
import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private bookSubject$ : BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public books$ = this.bookSubject$.asObservable();

  constructor() {

    timer(2000).subscribe(()=>{
      this.bookSubject$.next([
        {title:"Book1", pages:200, authors:["john","nicole"]},
        {title:"Book2", pages:100, authors:["milly"]},
        {title:"Book3", pages:200, authors:["fred"]},
        {title:"Book4", pages:200, authors:["ane","peter","samuel"]},
        {title:"Book5", pages:200, authors:["paul","john"]}
      ])
    })

  }


  add(book:Book){
   this.bookSubject$.getValue().push(book);
  }

  remove(i:number){
    let books= this.bookSubject$.getValue();

    if(i>=0 && i<books.length){
      books.splice(i,1);
    }
  }

  get(i: number): Observable<Book>{
    return this.books$.pipe(
      map((books)=> (i>=0 && i<books.length) ? books[i] :  {title:"", pages:0, authors:[]})
    )
  }
}
