import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CountryViewComponent } from './country-view/country-view.component';
import { HttpServiceService } from './http-service.service';
import { CountryDetailComponent } from './country-detail/country-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryViewComponent,
    CountryDetailComponent,
   
  ],
  imports: [
    BrowserModule,HttpClientModule,
    RouterModule.forRoot([
      {path:'home',component:HomeComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:"countries-list",component:CountryViewComponent},
      {path:"country-detail/:countryName",component:CountryDetailComponent}
    ])
  ],
  providers: [HttpServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
