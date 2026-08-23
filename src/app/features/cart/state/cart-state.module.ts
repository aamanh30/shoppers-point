import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './+store/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './+store/cart.effects';
import { CART_FEATURE_KEY } from './+store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CART_FEATURE_KEY, cartReducer),
    EffectsModule.forFeature(CartEffects),
  ],
})
export class CartStateModule {}
