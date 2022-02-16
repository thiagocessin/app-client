import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup = this.fb.group({
    'email':['', [Validators.required, Validators.email]],
    'password':['', [Validators.required, Validators.minLength(6)]]

  });

  loading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const credenciais = this.loginForm.value;
    this.loading = true;

    this.authService.login(credenciais)
      .subscribe((user)=>{
        this.showSnackBar('Login successful','OK');
        this.router.navigateByUrl('/');
        this.loading = false;
      },
      (e)=>{
        this.showSnackBar('Error','OK');
        this.loading = false;
      });
  }


  showSnackBar(msg:string,btn:string){
    this.snackBar.open(msg,btn,{duration:2000});
  }
}
