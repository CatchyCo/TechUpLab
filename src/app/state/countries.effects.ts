import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountriesService } from '../countries.service';
import { map, mergeMap } from 'rxjs';
import { getCountryData, getCountryDataSuccess } from './country.action';

@Injectable({
  providedIn: 'root',
})
export class CountryEffect {
  constructor(
    public action$: Actions,
    public countryService: CountriesService
  ) {}

  fetchCountries$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getCountryData),
      mergeMap(() => {
        return this.countryService.getCountries().pipe(
              map((data) => {
                  console.log(data);
           //       const countries = data['data']
                  return getCountryDataSuccess({ countries: [data] });
              })
          );
      })
    );
  });
}
