import { createAction, props } from "@ngrx/store";

export const getCountryData = createAction('');
export const getCountryDataSuccess = createAction('GET_COUNTRY_SUCCESS', props<{countries : any}>() );