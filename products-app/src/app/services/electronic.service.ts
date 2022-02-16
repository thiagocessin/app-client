import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Electronic } from '../model/electronic';

@Injectable({
  providedIn: 'root'
})
export class ElectronicService {


  private electronicSubject$: BehaviorSubject<Electronic[]> = new BehaviorSubject<Electronic[]>([]);
  public electronics$ = this.electronicSubject$.asObservable();
  constructor() {
    timer(1000)
      .subscribe(()=>{
        this.electronicSubject$.next([
          {name:"Headphone", brand:"Bose",price:200,description:"Noise cancelling"},
          {name:"prod1", brand:"b1",price:300,description:"d1"},
          {name:"prod2", brand:"b2",price:400,description:"d2"},
        ])

      })

  }

  get(i: number): Observable<Electronic>{
    return this.electronics$.pipe(
      map((el)=> (i>=0 && i<el.length) ? el[i] :  {name:"", brand:"",price:0,description:""}),
      delay(1000)
    )
  }

}
