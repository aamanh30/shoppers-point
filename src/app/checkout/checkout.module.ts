import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutDetailsComponent } from './checkout-details/checkout-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { Route, RouterModule } from '@angular/router';
import { CatalogueStateModule } from '../catalogue-state';
import { CartStateModule } from '../cart-state';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { CheckoutStateModule } from '../checkout-state/checkout-state.module';
import { AddressFormComponent } from './address-form/address-form.component';

const routes: Route[] = [
  {
    path: '',
    component: CheckoutDetailsComponent
  }
];

@NgModule({
  declarations: [
    CheckoutDetailsComponent,
    OrderSummaryComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CheckoutStateModule,
    CatalogueStateModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    CartStateModule
  ]
})
export class CheckoutModule {}
