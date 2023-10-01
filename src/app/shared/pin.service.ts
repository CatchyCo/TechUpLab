import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PinService {

  constructor(
    public http: HttpClient,
    public firebaseStore: AngularFirestore
  ) {}

  
  public getPinData() {
    return this.firebaseStore.collection('/PinCollections').snapshotChanges();
  }

  public addPinData(pinForm:any) {
    pinForm.id = this.firebaseStore.createId();
    return of(this.firebaseStore.collection('/PinCollections').add(pinForm));
  }
}
