import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, Observer } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-http-requests',
  templateUrl: './http-requests.component.html',
  styleUrls: ['./http-requests.component.css']
})
export class HttpRequestsComponent implements OnInit {

  simpleReqProductsObs$!: Observable<Product[]>;
  productsErrorHandling: Product[] = [];
  
  constructor(private productService: ProductsService,
              private snackBar: MatSnackBar){
  }

  ngOnInit(){
   
  }

  getSimpleHttpRequest(){
    this.simpleReqProductsObs$ = this.productService.getProdutos();
  }

  getProductsWithErrorHandling(){
    this.productService.getProdutosErro()
      .subscribe(
      (prods)=>{
        this.productsErrorHandling = prods;
      },
      (err)=>{
        console.log(err);
        console.log("Message: ", err.error.msg);
        console.log("Status code: ", err.status);

        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_error'];

        if(err.status == 0)
          this.snackBar.open('Could not connect to the server','',config);
        else 
          this.snackBar.open(err.error.msg,'',config);

      }
      
      )
  }

  getProductsWithOk(){

  }
}
