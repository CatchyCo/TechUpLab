import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { CustomerService } from 'src/app/shared/customer.service';
import { getCustomerData, getCustomerDataSuccess } from './customer.actions';

@Injectable({
  providedIn: 'root',
})
export class CustomerEffect {
  constructor(
    public action$: Actions,
    public customerService: CustomerService
  ) {}

  fetchCustomer$ = createEffect(() => {
    return this.action$.pipe(
      ofType(getCustomerData),
      mergeMap(() => {
        return this.customerService.getCustomer().pipe(
          map((customers) => {
            const customerList = customers.map((e) => {
              const customer: any = e.payload.doc.data();
              customer.id = e.payload.doc.id;
              return customer;
            });
            return getCustomerDataSuccess({ customer: customerList });
          })
        );
      })
    );
  });
}
