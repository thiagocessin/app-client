import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  firstName = new FormControl('');
  lastName = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.firstName.valueChanges
      .subscribe((newName)=>console.log(newName));
  }

  setFirstName(){
    this.firstName.setValue('Adam');
    console.log(this.firstName.value);
  }

}
