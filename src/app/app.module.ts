import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared/shared.module';
import { HttpClientModule } from  '@angular/common/http';
import { ListOfPinComponent } from './components/list-of-pin/list-of-pin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppReducer } from './store/app.store';
import { CountryEffect } from './state/countries.effects';


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
    ReactiveFormsModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([CountryEffect ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
