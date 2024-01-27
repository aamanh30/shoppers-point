import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';
import { CART_KEY } from './store/cart-key';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CART_KEY, cartReducer),
    EffectsModule.forFeature(CartEffects)
  ]
})
export class CartStateModule {}
