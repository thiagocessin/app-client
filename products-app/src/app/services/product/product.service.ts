import { DepartmentService } from 'src/app/services/department/department.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { Department } from 'src/app/model/department';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:9000/products';

  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private loaded: boolean = false;
  private departments: Department[] = [];

  constructor(private http: HttpClient,
              private departmentService: DepartmentService) {


              }

  get(): Observable<Product[]>{

    if(!this.loaded){

      this.http.get<Product[]>(this.url)
        .pipe(
          map((prods)=>{

            console.log('PRODS',prods)

            return prods;
          })
        )


        .subscribe(this.productsSubject$);



      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }


  add(product:Product): Observable<Product>{
    console.log('SAVE', product)

    let departmentsIds= (product.departments as Department[]).map(d=> d._id);

    return this.http.post<Product>(this.url,product)
      .pipe(
        tap((p)=>{
          this.productsSubject$.getValue().push({...product,_id:p._id});
        })
      )
  }

  del(prod:Product): Observable<any>{
    return this.http.delete(`${this.url}/${prod._id}`)
      .pipe(
        tap(()=>{
          let products = this.productsSubject$.getValue();

          let i = products.findIndex(p=> p._id === prod._id);

          if(i >=0){
            products.splice(i,1);
          }

        })
      )
  }
  update(product:Product): Observable<Product>{
    let departments = (product.departments as Department[]).map(d=> d._id);

    return this.http.patch<Product>(`${this.url}/${product._id}`,{...product,departments})
    .pipe(
      tap((p)=>{
        let products = this.productsSubject$.getValue();
        let i = products.findIndex(p=> p._id === product._id);

        if(i >=0){
          products[i] = product;
        }

      })
    )

  }

}
