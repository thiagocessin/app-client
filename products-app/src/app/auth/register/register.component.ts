import { AuthService } from './../auth.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
      'firstname':['', Validators.required],
      'lastname':['', Validators.required],
      'address':['', Validators.required],
      'city':['', Validators.required],
      'state':['', Validators.required],
      'phone':['', Validators.required],
      'mobilephone':['', Validators.required],
      'email':['', [Validators.required, Validators.email]],
      'password1':['', [Validators.required, Validators.minLength(6)]],
      'password2':['', [Validators.required,Validators.minLength(6)]],
  },{validator:this.matchingPasswords});


  states = ["MG","SP","RS", "GO", "PR", "RN"];
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(){

    let u: User = {...this.formRegister.value,password:this.formRegister.value.password1};

    this.authService.register(u)
      .subscribe((user)=>{
        this.showSnackBar('Sucesso','OK');
        this.router.navigateByUrl('/auth/login');
      },
      (e)=>{
        console.error(e);
        this.showSnackBar(e.error.message,'OK');

      });

  }

  showSnackBar(msg:string,btn:string){
    this.snackBar.open(msg,btn,{duration:2000});
  }

  matchingPasswords(group:FormGroup){
    if(group){
      const pass1 = group.controls['password1'].value;
      const pass2 = group.controls['password2'].value;

      if(pass1 == pass2)return null;

      return {matching:false}

    }
    return null;
  }

}
