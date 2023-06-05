import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CART_KEY, cartReducer } from './store/cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CART_KEY, cartReducer),
    EffectsModule.forFeature(CartEffects)
  ]
})
export class CartStateModule {}
