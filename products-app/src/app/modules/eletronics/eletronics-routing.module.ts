import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicDetailComponent } from 'src/app/components/electronic-list/electronic-detail/electronic-detail.component';
import { ElectronicListComponent } from 'src/app/components/electronic-list/electronic-list.component';

const routes: Routes = [
  {path:'',component:ElectronicListComponent},
  {path:':index',component:ElectronicDetailComponent}];

 //{path:'electronics',component:ElectronicListComponent},
  //{path:'electronics/:index',component:ElectronicDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EletronicsRoutingModule { }
