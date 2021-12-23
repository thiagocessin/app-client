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
  productsLoading: Product[] = [];
  bLoading : boolean = false;
  productsIds: Product[] = [];
  newlyProducts: Product[] = [];

  productsToDelete: Product[] = [];

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

        //não consegue conectar ao servidor
        if(err.status == 0)
          this.snackBar.open('Could not connect to the server','',config);
        else
          this.snackBar.open(err.error.msg,'',config);

      }

      )
  }

  getProductsWithOk(){
    this.productService.getProdutosDelay()
    .subscribe(
    (prods)=>{
      this.productsErrorHandling = prods;

      let config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['snack_ok'];

      this.snackBar.open('Products successfuly loaded!','',config);
    },
    (err)=>{
      console.log(err);
       }

    )
  }



  getProductsLoading(){

  this.bLoading = true;

    this.productService.getProdutosDelay()
    .subscribe(
      (prods)=>{
        this.productsLoading = prods;
        this.bLoading = false;

      },
      (err)=>{
        console.log(err);
        this.bLoading = false;
        }

      )

  }

  getProductsIds(){
    this.productService.getProdutosIds()
      .subscribe((ids)=>{
        this.productsIds = ids.map(id=>({_id:id, name:'', department:'', price:0}))
      });
  }


  loadName(id?:string){

    let _id = '';

    if(id) _id = id;

    this.productService.getProdutoName(_id)
      .subscribe((name)=>{
       let index =  this.productsIds.findIndex(p=>p._id===id);
        if(index > 0){
          this.productsIds[index].name = name;
        }

      });

  }


  saveProduct(name:string, department: string, pr:any){

    let price: number = pr;

    let p = {name,department,price};
    console.log('Save product controller');

    this.productService.saveProduct(p)
    .subscribe((p:Product)=>{

      console.log(p);
      this.newlyProducts.push(p);

    },
    (err)=>{
      console.log(err);

      let config = new MatSnackBarConfig();
      config.duration = 2000;
      config.panelClass = ['snack_err'];

      if(err.status == 0)
        this.snackBar.open('Could not connect to the server','',config);
      else
        this.snackBar.open(err.error.msg,'',config);
    });

  }


  loadProductsToDelete(){
    this.productService.getProdutos()
    .subscribe((prods)=>{
      this.productsToDelete = prods;
    });
  }

  deleteProduct(p:Product){
    this.productService.deleteProduct(p)
      .subscribe((res)=>{
        let i = this.productsToDelete.findIndex(prod=>p._id==prod._id);

        if(i >=0)
          this.productsToDelete.splice(i,1);

      },
      (err)=>{
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_err'];

        if(err.status == 0)
          this.snackBar.open('Could not connect to the server','',config);
        else
          this.snackBar.open(err.error.msg,'',config);
      });

  }
}
