import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { WishlistDetailsComponent } from './wishlist-details/wishlist-details.component';
import { CartStateModule } from '../cart-state/cart-state.module';

const routes: Route[] = [
  {
    path: '',
    component: WishlistDetailsComponent
  }
];

@NgModule({
  declarations: [WishlistDetailsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CartStateModule]
})
export class WishlistModule {}
