import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{


  constructor(private authService: AuthService,
              private router: Router){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');
    if(token){
      const authReq = req.clone({
        setHeaders:{
          Authorization:token
        }
      });

      return next.handle(authReq)
        .pipe(catchError((error)=>{

          if(error instanceof HttpErrorResponse){
            if(error.status === 401){
              this.authService.logOut();
            }
          }
          return throwError(error);
        }))
    }

    return next.handle(req);
  }

}
