import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { CountryDetailInterface } from '../country-detail-interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})

// to be implemented
// an interface for detail of country
export class CountryDetailComponent implements OnInit {
  private countryDetailArray;
  public countryDetail;
  private name: string;
  private currency: string;
  private language: string;
  private langCode: string;
  private currencyCode: string;

  constructor(private _route: ActivatedRoute,
    private router: Router, private httpService: HttpServiceService, private sanitization: DomSanitizer) {
    console.log("Country detail component constructor called");
  }

  ngOnInit() {
    let countryName = this._route.snapshot.paramMap.get('countryName');
    this.httpService.getCountryDetail(countryName).subscribe(

      data => {
        this.countryDetailArray = data;
        console.log(this.countryDetailArray);
        // suprisingly this is giving array of objects and not a single object
        // it is suprising since it is generally beleived >> single name for single country
        // but that is not the case here
        let country = this.countryDetailArray[0];
        let cD: CountryDetailInterface = {
          name: country.name,
          capital: country.capital,
          population: country.population,
          latitude: country.latlng[0],
          longitude: country.latlng[1],
          flagImgUrl: country.flag,
          currency:country.currencies[0].name,
          currencyCode: country.currencies[0].code,
          languages:country.languages[0].name,
          langCode: country.languages[0].iso639_1,
          sanitisedImage : this.sanitization.bypassSecurityTrustStyle(`url(${country.flag})`),
          region : country.region,
          subregion : country.subregion
        }
        this.countryDetail = cD;
      
      },

      error => {
        console.log("some error occured");
        console.log(error.errorMessage);

      }

    );

  }

  goToCountryListComponentByCurrency(currency: string) {
    setTimeout(() => {


      this.router.navigate(['/countries-list'], {
        queryParams: {
          'region': '',
          'currency': currency, 'language': ''
        }
      });

    }, 1000);
  }

  goToCountryListComponentByLang(lang: string) {
    setTimeout(() => {


      this.router.navigate(['/countries-list'], {
        queryParams: {
          'region': '',
          'currency': '', 'language': lang
        }
      });

    }, 1000);
  }

}
