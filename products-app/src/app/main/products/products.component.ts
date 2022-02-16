import { Product } from 'src/app/main/product';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$: Observable<Product[]> | undefined;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.products$ = this.mainService.getProducts();
  }

}
