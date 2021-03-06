import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSliderModule} from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { HttpRequestsComponent } from './components/http-requests/http-requests.component'
import { DialogEditProductComponent } from './components/dialog-edit-product/dialog-edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenFormComponent } from './forms/template-driven-form/template-driven-form.component';
import { FormsNativeValidationComponent } from './forms/forms-native-validation/forms-native-validation.component';
import { FormValidationComponent } from './forms/form-validation/form-validation.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { FormGroupComponent } from './forms/form-group/form-group.component';
import { FormBuilderComponent } from './forms/form-builder/form-builder.component';
import { FormArrayComponent } from './forms/form-array/form-array.component';
import { ReactiveFormsValidatorComponent } from './forms/reactive-forms-validator/reactive-forms-validator.component';



@NgModule({
  declarations: [
    AppComponent,
    HttpRequestsComponent,
    DialogEditProductComponent,
    TemplateDrivenFormComponent,
    FormsNativeValidationComponent,
    FormValidationComponent,
    ReactiveFormComponent,
    FormGroupComponent,
    FormBuilderComponent,
    FormArrayComponent,
    ReactiveFormsValidatorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [],
  entryComponents:[DialogEditProductComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
