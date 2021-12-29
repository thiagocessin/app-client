import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-validator',
  templateUrl: './reactive-forms-validator.component.html',
  styleUrls: ['./reactive-forms-validator.component.css']
})
export class ReactiveFormsValidatorComponent implements OnInit {


  clientForm = this.fb.group({
    firstName: ['',[Validators.required,Validators.minLength(3)]],
    lastName: ['',[Validators.required],Validators.minLength(3)],
    birth: [new Date(),[Validators.required]],
    age: [0,[Validators.required, Validators.max(150), Validators.min(0)]],
    email: ['',[Validators.required, Validators.email]],
    street: ['',[Validators.required]],
    city: ['',[Validators.required]],
    state: ['',[Validators.required]],
    phone1: ['',[Validators.required],],
    phone2: ['',[Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.clientForm.controls.firstName.errors);

  }

}
