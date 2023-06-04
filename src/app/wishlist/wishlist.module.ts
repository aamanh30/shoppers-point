import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CART_KEY, cartReducer } from '../cart/store/cart.reducer';
import { CartEffects } from '../cart/store/cart.effects';
import { WishlistDetailsComponent } from './wishlist-details/wishlist-details.component';

const routes: Route[] = [
  {
    path: '',
    component: WishlistDetailsComponent
  }
];

@NgModule({
  declarations: [WishlistDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CART_KEY, cartReducer),
    EffectsModule.forFeature(CartEffects)
  ]
})
export class WishlistModule {}
