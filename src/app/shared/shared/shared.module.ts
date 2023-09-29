import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { CreatePinComponent } from '../create-pin/create-pin.component';

const sharedComponents = [CreateCustomerComponent,CreatePinComponent,];

@NgModule({
  declarations: [...sharedComponents],
  imports: [CommonModule],
  exports: [...sharedComponents],
})
export class SharedModule {}
