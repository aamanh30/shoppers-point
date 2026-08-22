import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, filter, map } from 'rxjs';
import {
  CartActions,
  CartFeature,
  CartSelectors,
  CartAction,
  CartStateModule,
} from '@shoppers-point/cart-state';
import { Product } from '@shoppers-point/shared-state';
import {
  CatalogueFeature,
  CatalogueSelectors,
} from '@shoppers-point/catalogue-state';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'shoppers-point-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, CartStateModule, CurrencyPipe],
})
export class WishlistDetailsComponent implements OnInit {
  wishlist$: Observable<Product[] | undefined> = EMPTY;
  readonly #router: Router = inject(Router);
  readonly #store: Store<
    CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState
  > = inject(
    Store<CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState>
  );

  ngOnInit(): void {
    this.wishlist$ = combineLatest([
      this.#store.select(CatalogueSelectors.allProductsLookUp),
      this.#store.select(CartSelectors.wishlist),
    ]).pipe(
      map(([productsLookUp, productIds]): Product[] =>
        productIds
          .map(productId => productsLookUp[productId])
          .filter((product): product is Product => Boolean(product))
      ),
      filter(wishlist => Boolean(wishlist.length))
    );
  }

  onMoveToCart(productId: number): void {
    this.#store.dispatch(
      CartActions.updateCart({
        productId,
        action: CartAction.increment,
        quantity: 1,
      })
    );
    this.onRemoveWishlist(productId);
  }

  onRemoveWishlist(productId: number): void {
    this.#store.dispatch(
      CartActions.updateWishlist({
        productId,
      })
    );
  }

  onProductSlected(productId: number): void {
    this.#router.navigate([`/product-details/${productId}`]);
  }
}
