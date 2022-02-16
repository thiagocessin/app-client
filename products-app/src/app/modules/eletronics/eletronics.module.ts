import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EletronicsRoutingModule } from './eletronics-routing.module';
import { ElectronicDetailComponent } from 'src/app/components/electronic-list/electronic-detail/electronic-detail.component';
import { ElectronicListComponent } from 'src/app/components/electronic-list/electronic-list.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ElectronicListComponent,
    ElectronicDetailComponent
  ],
  imports: [
    CommonModule,
    EletronicsRoutingModule,
    MaterialModule
  ]
})
export class EletronicsModule { }
