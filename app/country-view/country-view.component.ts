import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { UrlFilter } from '../url-filter-interface';
import { SafeStyle } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';


@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.css'],
  providers: [Location]
})
export class CountryViewComponent implements OnInit, UrlFilter {
 
  filterValue: string;
  public countriesArray;
  public sanitisedImageArray:SafeStyle[];
  private _urlParams;
  public filteredBy: string;

  constructor(private _route: ActivatedRoute,
    private router: Router, private httpService: HttpServiceService,
    private sanitization: DomSanitizer,private location:Location) {
    console.log("Country view component constructor called");
  }

  ngOnInit() {

    let urlParam = this.filterUrl();
    this._urlParams = urlParam;

    if(urlParam.region){

      this.setFilteredCountriesArrayByRegion(urlParam.region);
   
    }else if (urlParam.currency){

      this.setFilteredCountriesArrayCurrency(urlParam.currency);
      console.log(urlParam.currency)
   
    }else if (urlParam.language){
    
      this.setFilteredCountriesArrayByLanguage(urlParam.language);
   
    }else {
   
     console.log("NO PARAMETER IS VALID")
   
    }
     
  }

  setFilteredCountriesArrayByRegion(regionName:string):any{
    this.httpService.getCountriesByRegion(regionName).subscribe(

      data => {
        this.countriesArray = data;
        this.filteredBy = "Region";
      },

      error => {
        console.log("some error occured");
        console.log(error.errorMessage);

      }

    ); 
  }

  setFilteredCountriesArrayCurrency(currencyName:string):any{
    this.httpService.getCountriesByCurrencyFilter(currencyName).subscribe(

      data => {
        this.countriesArray = data;
        this.filteredBy = "Currency";
      },

      error => {
        console.log("some error occured");
        console.log(error.errorMessage);

      }

    );
  }

  setFilteredCountriesArrayByLanguage(langName:string):any{
    this.httpService.getCountriesByLanguageFilter(langName).subscribe(

      data => {
        this.countriesArray = data;
        this.filteredBy = "Language";
      },

      error => {
        console.log("some error occured");
        console.log(error.errorMessage);

      }

    );
  }

  getSanitisedImage(c) : any{
    return  this.sanitization.
      bypassSecurityTrustStyle(`url(${c.flag})`);
  }
 
  filterUrl(): any {
   // let id = this._route.snapshot.paramMap.get('regionName');
   let urlParams;
    this._route.queryParams.subscribe( params =>{
      urlParams = params;
    });
    
    return urlParams;
  }

  goToCountryDetailComponent(countryName: string): any {
    setTimeout(() => {
      this.router.navigate(['/country-detail', countryName]);
    }, 1000);
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }

}
