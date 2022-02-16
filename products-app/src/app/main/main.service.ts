import { Product } from 'src/app/main/product';
import { Person } from './person';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly url = 'http://localhost:9000/api';

  constructor(private http: HttpClient) { }

  getPeople():Observable<Person[]>{

    return this.http.get<Person[]>(`${this.url}/people`)
      .pipe(
        //tap(p=>console.log(p)),
        catchError((err)=>{
          return throwError(err);

        })
      )
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/products`)
    .pipe(
      //tap(p=>console.log(p)),
      catchError((err)=>{
        return throwError(err);

      })
    );
  }


}
