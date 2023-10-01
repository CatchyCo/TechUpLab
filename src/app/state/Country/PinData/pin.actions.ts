import { createAction, props } from "@ngrx/store";

export const getPinData = createAction('');
export const getPinDataSuccess = createAction('GET_PIN_SUCCESS', props<{pins : any}>() );