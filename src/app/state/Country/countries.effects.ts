import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { getCountryData, getCountryDataSuccess } from './country.action';
import { CountryService } from 'src/app/service/country-service.service';

@Injectable({
  providedIn: 'root',
})
export class CountryEffect {
  constructor(
    public action$: Actions,
    public countryService: CountryService
  ) {}

  fetchCountries$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getCountryData),
      mergeMap(() => {
        return this.countryService.getCountries().pipe(
              map((data) => {
                  return getCountryDataSuccess({ countries: data });
              })
          );
      })
    );
  });
}
