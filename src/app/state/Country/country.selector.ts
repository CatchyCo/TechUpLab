import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryData } from './country.state';

const countriesSelector = createFeatureSelector<CountryData>('countries');

export const getCountries = createSelector(countriesSelector, (state) => {
  return state.countries;
});
