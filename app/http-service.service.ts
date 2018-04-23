import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class HttpServiceService {

  public baseUrl: string = "https://restcountries.eu/rest/v2";
  private regionObject = [
    {
      name : "asia",
      img : "https://i.imgur.com/jQ2Mawn.jpg"
    },
    {
      name : "africa",
      img : "https://i.imgur.com/3nvSYCI.png"
    },
    {
      name : "europe",
      img : "https://i.imgur.com/51txJUy.png"
    },
    {
      name : "americas",
      img : "https://i.imgur.com/gAfgsj2.png"
    },
    {
      name : "oceania",
      img : "https://i.imgur.com/cbyHQUV.png"
    }
  ];
  // private regionArray = ["asia","africa","americas","europe","oceania"];
  


  constructor(private httpClient : HttpClient) {
    console.log("HTTP service called");
  }

  public getCountriesByRegion(regionName:string):any{
    let  myResponse = this.httpClient.get(this.baseUrl+"/region/"+regionName);
    console.log(myResponse);
    return myResponse;
  }

  public getCountriesByCurrencyFilter(currency:string):any{
    // searching by iso code not by filter
    //https://restcountries.eu/rest/v2/currency/cop
    let  myResponse = this.httpClient.get(this.baseUrl+"/currency/"+currency);
    console.log(myResponse);
    return myResponse;

  }

  public getCountriesByLanguageFilter(language:string):any{
    // searching by iso code not by filter
    //https://restcountries.eu/rest/v2/lang/es
    let  myResponse = this.httpClient.get(this.baseUrl+"/lang/"+language);
    console.log(myResponse);
    return myResponse;
  
  }

  public getCountryDetail(countryName:string):any{
   
    let  myResponse = this.httpClient.get(this.baseUrl+"/name/"+countryName+"?fullText=true");
    console.log(myResponse);
    return myResponse;
  
  }

  public getRegionObject() : any {
    return this.regionObject;
  }


}
