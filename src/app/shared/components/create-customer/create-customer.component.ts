import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CountryService } from 'src/app/service/country-service.service';
import { getCountryData } from 'src/app/state/Country/country.action';
import { getCountries } from 'src/app/state/Country/country.selector';
import { AppState } from 'src/app/store/app.store';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  constructor(public formBuilder: FormBuilder, public store:Store<AppState>,public countryService:CountryService) {
    this.customerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      region: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  public customerForm: FormGroup;
  public countries:string[] = [];
  public region:string[] = []

  ngOnInit(): void {
    this.store.dispatch(getCountryData());
    this.store.select(getCountries).pipe().subscribe(data =>{
      if(Object.keys(data).length){
        console.log(data['data'])
       const regionData =  this.countryService.getCountryAndRegion(data['data']);
       this.region = regionData['region'];
       this.countries = regionData['countries']
      }
    })
    }

  

  public checkErrors(control: string) {
    return (
      this.customerForm.get(control)?.errors &&
      this.customerForm.get(control)?.touched
    );
  }

  showErrorMessage(control: string) {
    let errorMsg = '';
    if (this.customerForm.get(control)?.hasError('required')) {
      errorMsg = this.controlRequiredErrorMessage(control);
    } else if (this.customerForm.get(control)?.hasError('email')) {
      errorMsg = this.controlPatternErrorMessage(control);
    }
    return errorMsg;
  }

  controlRequiredErrorMessage(control: string) {
    switch (control) {
      case 'title': {
        return 'Please enter title';
      }
      case 'email': {
        return 'Please enter email';
      }
      default: {
        return '';
      }
    }
  }

  controlPatternErrorMessage(control: string) {
    switch (control) {
      case 'email': {
        return 'Please enter valid email';
      }
      default: {
        return '';
      }
    }
  }
}
