import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryData } from '../state/Country/country.state';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(public http: HttpClient) {}

  public getCountries() {
    const url = 'https://run.mocky.io/v3/52fa255b-a4dc-442b-813f-5f32f9316a25';
    return this.http.get<CountryData>(url);
  }

  public getCountryAndRegion(region: any) {
    let information = Object.values(region);
    let regions: string[] = [];
    let countries: string[] = [];

    information.map((item) => {
      let typeCasting = JSON.parse(JSON.stringify(item));
      if (!regions.includes(typeCasting.region)) {
        regions.push(typeCasting.region);
      }
      if (!countries.includes(typeCasting.country)) {
        countries.push(typeCasting.country);
      }
    });

    return {
      'region' : regions,
      'countries' : countries
    };
  }
}
