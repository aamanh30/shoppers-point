import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSelectors, UserFeature } from './user-state';
import { EMPTY, Observable, map } from 'rxjs';
import { User } from './shared/models';
import { CartFeature, CartSelectors } from './cart-state';
import { CartProduct } from './cart-state/models';

@Component({
  selector: 'shoppers-point-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<User | undefined> = EMPTY;
  wishlist$: Observable<number[] | undefined> = EMPTY;
  products$: Observable<number[] | undefined> = EMPTY;
  constructor(
    private store: Store<
      UserFeature.UserPartialState & CartFeature.CartPartialState
    >
  ) {
    this.user$ = this.store.select(UserSelectors.user);
    this.wishlist$ = this.store.select(CartSelectors.wishlist);
    this.products$ = this.store
      .select(CartSelectors.products)
      .pipe(
        map((products: CartProduct[] | undefined) =>
          (products ?? []).map(product => product.quantity)
        )
      );
  }
}
