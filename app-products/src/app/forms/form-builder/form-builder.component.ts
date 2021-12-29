import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  clientForm = this.fb.group({
    firstName:[''],
    lastName:[''],
    address:this.fb.group({
      street:[''],
      city:[''],
      state:['']
    })
  });

  constructor(private fb: FormBuilder) {

  }



  ngOnInit(): void {

  }


  submit(){

    console.log(this.clientForm.value);
  }

}
