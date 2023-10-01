import { createAction, props } from "@ngrx/store";

export const getCustomerData = createAction('');
export const getCustomerDataSuccess = createAction('GET_COUNTRY_SUCCESS', props<{customer :any}>() );