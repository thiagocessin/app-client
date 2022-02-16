import { Department } from './../../model/department';
import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/services/department/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName:string = '';
  departments: Department[] = [];

  depEdit: Department = {name:''};
  private unsubscrible$ : Subject<any> = new Subject();

  constructor(private departmentService: DepartmentService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.departmentService.get()
    .pipe(takeUntil(this.unsubscrible$))
    .subscribe((deps)=>{
      this.departments = deps;
    })
  }

  save(){

    if(this.depEdit._id){

      this.departmentService.update({name:this.depName, _id:this.depEdit._id})
        .subscribe((dep)=>{
          this.clearFields();
          this.notify('Updated');
        },
        (err)=>{
          console.error(err);
          this.notify(err);

        })
    }else{
      console.log('save')
      this.departmentService.add({name:this.depName})
      .subscribe((dep)=>{
        console.log(dep);
        this.clearFields();
        this.notify('Inserted');
      },
      (err)=>{
        console.error(err);
      })
    }
  }

  clearFields(){
    this.depName='';
    this.depEdit = {name:''};
  }


  cancel(){
    this.clearFields();
  }

  delete(dep:Department){
    this.departmentService.delete(dep)
      .subscribe(()=>this.notify('Removed'),
      (err)=>{
        console.log(err);
       this.notify(err.error.msg);
      })

  }

  edit(dep:Department){
    this.depName = dep.name;
    this.depEdit = dep;
    console.log('depEdit',this.depEdit)

  }


  notify(msg: string){
    this.snackBar.open(msg,"OK",{duration:3000});
  }

  ngOnDestroy(){
    this.unsubscrible$.next();
  }

}
