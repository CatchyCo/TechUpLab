import { Action, createReducer, on } from '@ngrx/store';
import { CustomerState, initStateCustomer } from './customer.state';
import { getCustomerDataSuccess } from './customer.actions';

const __customerReducer = createReducer(
  initStateCustomer,
  on(getCustomerDataSuccess, (state, action) => {
    return {
      ...state,
      customer: [action.customer],
    };
  })
);

export function customerReducer(
  state: CustomerState | undefined ,
  actions: Action
) {
  return __customerReducer(state, actions);
}
