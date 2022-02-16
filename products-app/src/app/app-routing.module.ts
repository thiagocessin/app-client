import { EletronicsModule } from './modules/eletronics/eletronics.module';
import { BookDetailComponent } from './components/books/book-detail/book-detail.component';
import { DvdFormComponent } from './components/dvd/dvd-form/dvd-form.component';
import { DvdDetailComponent } from './components/dvd/dvd-detail/dvd-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DvdComponent } from './components/dvd/dvd.component';
import { BooksComponent } from './components/books/books.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookAuthorsComponent } from './components/books/book-authors/book-authors.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  {path:'dvds',component: DvdComponent},
  {path:'dvds/new', component: DvdFormComponent},
  {path:'dvds/:index',component: DvdDetailComponent},

  {path:'books',
    component: BooksComponent,
    children:[
      {path:':index',
       component: BookDetailComponent,
        children:[{path:'authors',component:BookAuthorsComponent}]},
    ]},
    //carrega o modulo especificado
  {path:'electronics',loadChildren:
    ()=>import('./modules/eletronics/eletronics.module')
            .then(m=>m.EletronicsModule)},
  {path:'',pathMatch:'full', redirectTo:'dvds'},
  {path:'**', component:PageNotFoundComponent},

]

const mainRoutes: Routes = [
  {path:'',pathMatch:'full', redirectTo:'/main/people'},
  {path:'main', loadChildren:
    ()=>import('./main/main.module').then(m=>m.MainModule),
    canActivate:[AuthGuard]
},

]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(mainRoutes),
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
