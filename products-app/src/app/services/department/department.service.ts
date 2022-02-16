import { Department } from './../../model/department';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:9000/departments';

  private departmentsSubject$ :BehaviorSubject<Department[]> = new BehaviorSubject<Department[]>([]);
  private departmentsIdsSubject$ :BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get():Observable<Department[]>{

    if(!this.loaded){
      this.http.get<Department[]>(this.url)
        .pipe()
        .subscribe(this.departmentsSubject$);

        this.loaded = true;
    }
    return this.departmentsSubject$.asObservable();
  }

  getById(id:string):Observable<Department[]>{
    return this.http.get<Department[]>(`${this.url}/${id}`);
  }

  getIds():Observable<string[]>{

    if(!this.loaded){
      this.http.get<string[]>(`${this.url}/ids`)
        .pipe()
        .subscribe(this.departmentsIdsSubject$);

        this.loaded = true;
    }
    return this.departmentsIdsSubject$.asObservable();
  }

  add(dep: Department){
    return this.http.post<Department>(this.url, dep)
    .pipe(tap((dep:Department)=>this.departmentsSubject$.getValue().push(dep)));

  }

  delete(dep: Department) : Observable<any>{

    return this.http.delete(`${this.url}/${dep._id}`)
      .pipe(tap(() =>{
         let departments = this.departmentsSubject$.getValue();
         let i = departments.findIndex(d=>d._id = dep._id);

         if(i >= 0){
           departments.splice(i,1);
         }
      }))

  }


  update(department: Department) :Observable<Department>{


    return this.http.patch<Department>(`${this.url}/${department._id}`,department)
      .pipe(tap((dep)=>{

        let departments = this.departmentsSubject$.getValue();
        let i = departments.findIndex(d=>d._id === dep._id);

        console.log('Lista:',departments);
        console.log('index:',i);

        if(i >= 0){
          departments[i].name = dep.name;
        }
      }));
  }
}
