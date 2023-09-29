import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { CreatePinComponent } from './components/create-pin/create-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';

const sharedComponents = [CreateCustomerComponent, CreatePinComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSelectModule],
  exports: [...sharedComponents],
})
export class SharedModule {}
