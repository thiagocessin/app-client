import { Dvd } from './../../../model/dvd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-detail',
  templateUrl: './dvd-detail.component.html',
  styleUrls: ['./dvd-detail.component.css']
})
export class DvdDetailComponent implements OnInit {

  dvd$: Observable<Dvd> = new Observable<Dvd>();
  hasTitle: boolean = false
  title:string = '';

  constructor(private route: ActivatedRoute,
              private dvdService: DvdService,
              private router: Router) { }

  ngOnInit(): void {

      let index = this.route.snapshot.paramMap.get('index');
      this.dvd$ = this.dvdService.get(Number(index));

      this.route.paramMap
        .subscribe((params:ParamMap)=>{
          if(params.has('title')){
            this.title = params.get('title') as string;
            this.hasTitle = true;
          }
        });

    /*
    console.log("index: ",this.route.snapshot.paramMap.get('index'));
    this.route.paramMap
      .subscribe((params:ParamMap)=>console.log("Index:",params.get("index")))

*/
  }

  goBack(){
    this.router.navigate(['/dvds']);
  }

}
