import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSliderModule} from '@angular/material/slider';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { HttpRequestsComponent } from './components/http-requests/http-requests.component'

@NgModule({
  declarations: [
    AppComponent,
    HttpRequestsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
