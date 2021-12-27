import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms-native-validation',
  templateUrl: './forms-native-validation.component.html',
  styleUrls: ['./forms-native-validation.component.css']
})
export class FormsNativeValidationComponent implements OnInit {

  firstName = ''
  lastName='';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){}

}
