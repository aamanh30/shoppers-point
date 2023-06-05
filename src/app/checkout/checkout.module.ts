import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutDetailsComponent } from './checkout-details/checkout-details.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { BillingFormComponent } from './billing-form/billing-form.component';
import { Route, RouterModule } from '@angular/router';
import { CatalogueStateModule } from '../catalogue-state';

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
    BillingFormComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), CatalogueStateModule]
})
export class CheckoutModule {}
