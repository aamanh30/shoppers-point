import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SummaryComponent } from './summary/summary.component';
import { CartStateModule } from '../cart-state';
import { UserStateModule } from '../user-state';
import { ProductsTableComponent } from './products-table/products-table.component';

const routes: Route[] = [
  {
    path: '',
    component: ShoppingCartComponent
  }
];

@NgModule({
  declarations: [ShoppingCartComponent, SummaryComponent, ProductsTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CartStateModule,
    UserStateModule
  ]
})
export class CartModule {}
