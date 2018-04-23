import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { SafeStyle } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public _regionObject;
  constructor(public httpService : HttpServiceService,private _route: ActivatedRoute,
    private router: Router, private sanitization: DomSanitizer) {
    console.log("Home Constructor Called");
   }

  ngOnInit() {
    this._regionObject = this.httpService.getRegionObject();
  }
  
  goToCountriesViewComponent(regionName:string):any{
    setTimeout(()=>{


      this.router.navigate(['/countries-list'],{ queryParams: { 'region': regionName , 
      'currency':'', 'language':''}});
   
    },1000);
  }

  getSanitisedImage(c) : any{
    return  this.sanitization.
      bypassSecurityTrustStyle(`url(${c})`);
  }
}
