import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { checkoutReducer } from './store/checkout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatalogueEffects } from './store/checkout.effects';
import { CHECKOUT_KEY } from './store/checkout-key';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CHECKOUT_KEY, checkoutReducer),
    EffectsModule.forFeature([CatalogueEffects])
  ]
})
export class CheckoutStateModule {}
