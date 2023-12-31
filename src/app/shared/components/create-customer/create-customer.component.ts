import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CountryService } from 'src/app/service/country-service.service';
import { getCountryData } from 'src/app/state/Country/country.action';
import { getCountries } from 'src/app/state/Country/country.selector';
import { AppState } from 'src/app/store/app.store';
import { CustomerService } from '../../customer.service';
import { CountryDataModel, Customer } from '../../model/shared.mode';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public store: Store<AppState>,
    public countryService: CountryService,
    public customerService:CustomerService
  ) {
    this.customerForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      region: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    this.customerForm
      .get('region')
      ?.valueChanges.subscribe((selectedRegion) => {
        if (selectedRegion && selectedRegion.length) {
          this.countriesAsPerSelectedRegion = [];
          this.countriesAsPerRegion.map((item) => {
            if (item.region === selectedRegion) {
              this.countriesAsPerSelectedRegion.push(item.country);
            }
          });
        } else {
          this.customerForm.get('country')?.patchValue('');
          this.countriesAsPerSelectedRegion = this.countries;
        }
      });

    this.customerForm
      .get('country')
      ?.valueChanges.subscribe((selectedCountry) => {
        if (selectedCountry && selectedCountry.length) {
          this.countriesAsPerRegion.map((item) => {
            if (item.country === selectedCountry) {
              this.customerForm.get('region')?.patchValue(item.region);
              return;
            }
          });
        }
      });
  }

  @Output() public closeModal: EventEmitter<Event> = new EventEmitter<Event>();

  public customerForm: FormGroup;
  public countries: string[] = [];
  public countriesAsPerSelectedRegion: string[] = [];
  public region: string[] = [];
  public countriesAsPerRegion: CountryDataModel[] = [];

  ngOnInit(): void {
    this.store.dispatch(getCountryData());
    this.store
      .select(getCountries)
      .pipe()
      .subscribe((data) => {
        if (Object.keys(data).length) {
          this.countriesAsPerRegion = JSON.parse(
            JSON.stringify(Object.values(data['data']))
          );
          const regionData = this.countryService.getCountryAndRegion(
            data['data']
          );
          this.region = regionData['region'];
          this.countries = regionData['countries'];
          this.countriesAsPerSelectedRegion = this.countries;
        }
      });
  }

  /* 
  Checks the form control has error or not.
  */
  public checkErrors(control: string) {
    return (
      this.customerForm.get(control)?.errors &&
      this.customerForm.get(control)?.touched
    );
  }

  /* 
  Return the Error message for form controls as per type
  */

  public showErrorMessage(control: string) {
    let errorMsg = '';
    if (this.customerForm.get(control)?.hasError('required')) {
      errorMsg = this.controlRequiredErrorMessage(control);
    } else if (this.customerForm.get(control)?.hasError('email')) {
      errorMsg = this.controlPatternErrorMessage(control);
    }
    return errorMsg;
  }

  /* 
  Return the Error message for form-controls as per control
  */

  public controlRequiredErrorMessage(control: string) {
    switch (control) {
      case 'title': {
        return 'Please enter title';
      }
      case 'email': {
        return 'Please enter email';
      }
      case 'country': {
        return 'Please select country';
      }
      case 'region': {
        return 'Please select region';
      }
      default: {
        return '';
      }
    }
  }

  /* 
   Return the Error message for form-controls as per control input value
  */

  public controlPatternErrorMessage(control: string) {
    switch (control) {
      case 'email': {
        return 'Please enter valid email';
      }
      default: {
        return '';
      }
    }
  }

  /* 
  Final Sumbit form functions
  */

  public onSubmit() {
    const customerData = {
      id: 0,
      title: this.customerForm.get('title')?.value,
      email: this.customerForm.get('email')?.value,
      region: this.customerForm.get('region')?.value,
      country: this.customerForm.get('country')?.value,
    };
    let customerList: Customer[] = [];
    if (localStorage.getItem('customerList')) {
      customerList = JSON.parse(localStorage.getItem('customerList') || '[]');
      customerList.push(customerData);
      localStorage.setItem('customerList', JSON.stringify(customerList));
    } else {
      customerList.push(customerData);
      localStorage.setItem('customerList', JSON.stringify(customerList));
    }
    this.customerService.addCustomer(customerData);
    this.customerForm.reset();
    this.closeModal.emit();
  }
}
