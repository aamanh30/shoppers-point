import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, concatMap, map } from 'rxjs';
import {
  CartActions,
  CartFeature,
  CartSelectors,
  CartAction
} from '@shoppers-point/cart-state';
import { Product } from '../../shared/models';
import {
  CatalogueFeature,
  CatalogueSelectors
} from '@shoppers-point/catalogue-state';

@Component({
    selector: 'shoppers-point-wishlist-details',
    templateUrl: './wishlist-details.component.html',
    styleUrls: ['./wishlist-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class WishlistDetailsComponent {
  wishlist$: Observable<Product[] | undefined> = EMPTY;
  constructor(
    private store: Store<
      CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState
    >,
    private router: Router
  ) {
    this.wishlist$ = combineLatest([
      this.store.select(CatalogueSelectors.allProductsLookUp),
      this.store.select(CartSelectors.wishlist)
    ]).pipe(
      map(([productsLookUp, productIds]) =>
        productIds
          .map(productId => <Product>productsLookUp[productId])
          .filter(product => product)
      )
    );
  }

  onMoveToCart(productId: number): void {
    this.store.dispatch(
      CartActions.updateCart({
        productId,
        action: CartAction.increment,
        quantity: 1
      })
    );
    this.onRemoveWishlist(productId);
  }

  onRemoveWishlist(productId: number): void {
    this.store.dispatch(
      CartActions.updateWishlist({
        productId
      })
    );
  }

  onProductSlected(productId: number): void {
    this.router.navigate([`/product-details/${productId}`]);
  }
}
