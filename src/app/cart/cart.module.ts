import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SummaryComponent } from './summary/summary.component';
import { UserModule } from '../user/user.module';
import { CartStateModule } from '../cart-state';

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
    CartStateModule,
    UserModule
  ]
})
export class CartModule {}
