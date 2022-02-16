import { AuthInterceptor } from './auth/auth.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BooksComponent } from './components/books/books.component';
import { DvdComponent } from './components/dvd/dvd.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductComponent } from './components/product/product.component';
import { DepartmentComponent } from './components/department/department.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './components/routes/routes.component';
import { AppRoutingModule } from './app-routing.module';
import { DvdDetailComponent } from './components/dvd/dvd-detail/dvd-detail.component';
import { DvdFormComponent } from './components/dvd/dvd-form/dvd-form.component';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';
import { BookAuthorsComponent } from './components/books/book-authors/book-authors.component';
import { EletronicsModule } from './modules/eletronics/eletronics.module';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';

/*
const appRoutes: Routes = [
  {path:'dvds',component: DvdComponent},
  {path:'books', component: BooksComponent},
  {path:'',pathMatch:'full', redirectTo:'dvds'},
  {path:'**', component:PageNotFoundComponent}
]*/

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    DepartmentComponent,
    RoutesComponent,
    BooksComponent,
    DvdComponent,
    PageNotFoundComponent,
    DvdDetailComponent,
    DvdFormComponent,
    BookDetailComponent,
    BookAuthorsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //EletronicsModule,
    AppRoutingModule,
    AuthModule.forRoot(),
  ],
  providers: [
    //requisições são interceptadas na ordem de declaração
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,  multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
