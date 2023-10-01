import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.state';

const customerSelector = createFeatureSelector<CustomerState>('customer');

export const getCustomer = createSelector(customerSelector, (state) => {
  return state.customer;
});
