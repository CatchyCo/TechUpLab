import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat"
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { ListOfPinComponent } from './components/list-of-pin/list-of-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './store/app.store';
import { CountryEffect } from './state/Country/countries.effects';
import { SharedModule } from './shared/shared.module';
import { environment } from 'src/environment/environment';
import { CustomerEffect } from './state/Country/Customer/customer.effects';
import { PinEffect } from './state/Country/PinData/pin.effects';



@NgModule({
  declarations: [
    AppComponent,
    ListOfPinComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([CountryEffect, CustomerEffect, PinEffect ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
