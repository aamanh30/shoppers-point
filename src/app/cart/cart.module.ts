import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { CART_KEY, cartReducer } from './store/cart.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './store/cart.effects';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SummaryComponent } from './summary/summary.component';
import { UserModule } from '../user/user.module';

const routes: Route[] = [
  {
    path: '',
    component: ShoppingCartComponent
  }
];

@NgModule({
  declarations: [ShoppingCartComponent, SummaryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(CART_KEY, cartReducer),
    EffectsModule.forFeature(CartEffects),
    UserModule
  ]
})
export class CartModule {}
