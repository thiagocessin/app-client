import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:9000/auth';

  private userInitialize = {
    firstName:'',
    lastName: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    mobilephone: '',
    email: '',
    password: '',
    token:''
  }
  private subjUser$: BehaviorSubject<User> = new BehaviorSubject<User>(this.userInitialize);
  private subLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient,
              private router: Router) { }

  register(user:User): Observable<User>{
    return this.http.post<User>(`${this.url}/register`,user);
  }

  login(credentials: {email:string, password:string}): Observable<User>{
    return this.http.post<User>(`${this.url}/login`,credentials)
    .pipe(
      tap((u:User)=>{
        localStorage.setItem('token',u.token);
        this.subLoggedIn$.next(true);
        this.subjUser$.next(u);
      })
    )

  }

  isAutenthicated(): Observable<boolean>{
    const token = localStorage.getItem('token');

    if(token && !this.subLoggedIn$.value){
      return this.checkTokenValidation();
    }

    return this.subLoggedIn$.asObservable();
  }

  checkTokenValidation() : Observable<boolean>{
    return this.http.get<User>(`${this.url}/user`)
          .pipe(
            tap((u:User)=>{
              if(u){
                localStorage.setItem('token',u.token)
                this.subLoggedIn$.next(true);
                this.subjUser$.next(u);
            }
            }),
            map((u:User)=>(u)?true:false),
            catchError((error)=>{
              this.logOut();
              return of(false);

            })
          )

  }

  getUser(): Observable<User>{
    return this.subjUser$.asObservable();
  }

  logOut(){
    localStorage.removeItem('token');
    this.subLoggedIn$.next(false);
    this.subjUser$.next(this.userInitialize);
    this.router.navigateByUrl('/auth/login');
  }
}
