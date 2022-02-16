import { User } from './auth/user';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  authenticated$: Observable<boolean> | undefined;
  user$: Observable<User> | undefined;

    constructor(private authService:AuthService){
    this.authenticated$ = this.authService.isAutenthicated();

    this.user$ = this.authService.getUser();

    this.authenticated$.subscribe((item)=>{

      console.log('APP',item)
    })
  }


  logout(){

    this.authService.logOut();
  }
}
