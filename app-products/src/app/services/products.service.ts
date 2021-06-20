import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url:string = 'http://localhost:9000';

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  getProdutosErro(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }
}
