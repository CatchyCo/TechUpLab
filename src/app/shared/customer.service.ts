import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

export interface Customer {
  title: any;
  email: any;
  region: any;
  country: any;
  id: any;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(
    public http: HttpClient,
    public firebaseStore: AngularFirestore
  ) {}

  public addCustomer(customer: Customer) {
    customer.id = this.firebaseStore.createId();
    return of(this.firebaseStore.collection('/Customer').add(customer));
  }

  public getCustomer() {
    return this.firebaseStore.collection('/Customer').snapshotChanges();
  }
}
