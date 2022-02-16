import { DvdService } from './../../services/dvd.service';
import { Dvd } from './../../model/dvd';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dvd',
  templateUrl: './dvd.component.html',
  styleUrls: ['./dvd.component.css']
})
export class DvdComponent implements OnInit {

  dvds$ :Observable<Dvd[]> = new Observable<Dvd[]>();
  constructor(private dvdService: DvdService,
              private router: Router) { }

  ngOnInit(): void {

    this.dvds$ =this.dvdService.dvds$;
  }

  goDetails(i:number, dvd: Dvd){
    this.router.navigate([`dvds/${i}`,{title:dvd.title}])
  }

  remove(i:number){
    this.dvdService.remove(i);
  }


}
