import { SafeStyle } from "@angular/platform-browser";

// definition of the interface 

export interface CountryDetailInterface {
    name: string,
    capital: string,
    region?: string,
    subregion?: string,
    population:number,
    latitude:number,
    longitude:number,
    currency: string,
    currencyCode:string,
    languages: string,
    langCode:string,
    flagImgUrl: string,
    sanitisedImage:SafeStyle
}