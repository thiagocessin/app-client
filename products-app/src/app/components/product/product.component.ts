import { ProductService } from './../../services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Department } from 'src/app/model/department';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name:['',[Validators.required]],
    stock:[0,[Validators.required,Validators.min(0)]],
    price:[0,[Validators.required,Validators.min(0)]],
    departments:[[], [Validators.required]]

  });

  @ViewChild('form') form: NgForm | undefined;

  prodsDepartments: Department[] = [];
  products: Product[] = [];
  departments: Department[] = [];
  private unsubscrible$: Subject<any> = new Subject();

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private departmentService: DepartmentService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.get()
      .pipe(takeUntil(this.unsubscrible$))
      .subscribe((prods)=>{
      this.products = prods;

      console.log('Products', this.products)

      this.departmentService.get()
        .pipe(takeUntil(this.unsubscrible$))
        .subscribe((deps)=>{

          console.log('Departments', deps)
          this.departments = deps;
        })
    })
  }

  ngOnDestroy(){
    this.unsubscrible$.next();
  }

  save(){

    let data = this.productForm.value;

    if(data._id != null){
      this.productService.update(data)
        .subscribe();

    }else{
      this.productService.add(data)
        .subscribe();
    }
    this.resetForm();
  }

  delete(prod:Product){
    this.productService.del(prod)
      .subscribe(()=>{
        this.notify("Deleted");
      },
      (err)=> this.notify(err));
  }

  edit(prod:Product){
    this.productForm.setValue(prod);
  }

  notify(msg: string){
    this.snackbar.open(msg,"OK",{duration:3000});
  }


  resetForm(){

    //this.productForm.reset();
    this.form?.resetForm();

  }
}
