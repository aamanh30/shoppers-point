import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CHECKOUT_KEY, checkoutReducer } from './store/checkout.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CatalogueEffects } from './store/checkout.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CHECKOUT_KEY, checkoutReducer),
    EffectsModule.forFeature([CatalogueEffects])
  ]
})
export class CheckoutStateModule {}
