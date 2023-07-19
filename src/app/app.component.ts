import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSelectors, UserFeature } from './user-state';
import {
  EMPTY,
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil
} from 'rxjs';
import { Product, User } from './shared/models';
import { CartFeature, CartSelectors } from './cart-state';
import { CartProduct } from './cart-state/models';
import { CatalogueActions, CatalogueSelectors } from './catalogue-state';
import { Router } from '@angular/router';
import { AuthActions } from './auth-state';
import { ProgressType } from './progress-state';

@Component({
  selector: 'shoppers-point-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  user$: Observable<User | undefined> = EMPTY;
  wishlist$: Observable<number[] | undefined> = EMPTY;
  products$: Observable<Product[] | undefined> = EMPTY;
  productQuantities$: Observable<number[] | undefined> = EMPTY;
  searchProducts$: Subject<string> = new Subject<string>();
  readonly isDestroyed$: Subject<void> = new Subject<void>();
  constructor(
    private store: Store<
      UserFeature.UserPartialState & CartFeature.CartPartialState
    >,
    private router: Router
  ) {
    this.user$ = this.store.select(UserSelectors.user);
    this.wishlist$ = this.store.select(CartSelectors.wishlist);
    this.products$ = this.store.select(CatalogueSelectors.searchProducts);
    this.productQuantities$ = this.store
      .select(CartSelectors.products)
      .pipe(
        map((products: CartProduct[] | undefined) =>
          (products ?? []).map(product => product.quantity)
        )
      );
    this.store.dispatch(AuthActions.fetchUser());

    this.searchProducts$
      .pipe(
        takeUntil(this.isDestroyed$),
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(search =>
        this.store.dispatch(
          CatalogueActions.searchProducts({
            search,
            progressType: ProgressType.start
          })
        )
      );
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  onSignOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }

  onSearch(search: string | undefined = ''): void {
    if (!search || search.length < 3) {
      return;
    }
    this.searchProducts$.next(search);
  }

  onSelectProduct(productId: number): void {
    this.store.dispatch(CatalogueActions.clearSearchProducts());
    this.router.navigate([`/product-details/${productId}`]);
  }
}
