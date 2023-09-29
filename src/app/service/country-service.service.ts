import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryData } from '../state/country.state';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  constructor(public http:HttpClient) { }

  public getCountries(){
    const url = 'https://run.mocky.io/v3/52fa255b-a4dc-442b-813f-5f32f9316a25';
    return this.http.get<CountryData>(url)
  }
}
