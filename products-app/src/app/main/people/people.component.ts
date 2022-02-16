import { Person } from './../person';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Person[]> | undefined;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople();
  }

}
