import { Product } from './../model/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getProdutosDelay(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/productsdelay`);
  }

  getProdutosIds(): Observable<string[]>{
    return this.http.get<string[]>(`${this.url}/products_ids`);
  }

  getProdutoName(id:string): Observable<string>{
    return this.http.get(`${this.url}/products/name/${id}`,{responseType:"text"});
  }

  saveProduct(p: Product): Observable<Product>{
    console.log('Save product service');

    return this.http.post<Product>(`${this.url}/products`,p);
  }

  deleteProduct(p:Product){
    return this.http.delete(`${this.url}/products/${p._id}`);
  }

  editProduct(p: Product) : Observable<Product>{
    return this.http.patch<Product>(`${this.url}/products/${p._id}`,p);
  }
}
