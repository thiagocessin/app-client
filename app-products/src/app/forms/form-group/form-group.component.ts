import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  clientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),

      name: new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
      })
  });
  constructor() { }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.clientForm.value);

    console.log(`
      First Name: ${this.clientForm.value.firstName},
      LastName:${this.clientForm.value.lastName}
    `)
  }

}
