import { Injectable } from '@angular/core';
import { BehaviorSubject, timer, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Dvd } from '../model/dvd';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

private dvdSubject$: BehaviorSubject<Dvd[]> = new BehaviorSubject<Dvd[]>([]);
public dvds$ = this.dvdSubject$.asObservable();

  constructor() {
    timer(2000)
    .subscribe(()=>{
      this.dvdSubject$.next([
        {title:"DVD - Beegees", year:2016, genre:"Music"},
        {title:"The Wind", year:2018, genre:"Movie"},
      ]);
    })
  }

  add(dvd:Dvd){
    this.dvdSubject$.getValue().push(dvd);
   }

   remove(i:number){
     let dvds= this.dvdSubject$.getValue();

     if(i>=0 && i<dvds.length){
      dvds.splice(i,1);
     }
   }

   get(i: number): Observable<Dvd>{
     return this.dvds$.pipe(
       map((dvds)=> (i>=0 && i<dvds.length) ? dvds[i] :  {title:"", year:0, genre:""}),
       delay(1000)
     )
   }
}
