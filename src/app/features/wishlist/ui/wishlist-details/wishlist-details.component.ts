import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CartActions,
  CartFeature,
  CartSelectors,
  CartAction,
  CartStateModule,
} from '@shoppers-point/cart-state';
import { Product } from '@shoppers-point/shared-state';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors,
} from '@shoppers-point/catalogue-state';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProgressType } from '@shoppers-point/progress-state';

@Component({
  selector: 'shoppers-point-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, CartStateModule, CurrencyPipe],
})
export class WishlistDetailsComponent implements OnInit {
  wishlist = computed(() => {
    const productsLookUp = this.#allProductsLookUp();
    const productIds = this.#wishlist();

    return productIds
      .map(productId => productsLookUp[productId])
      .filter((product): product is Product => Boolean(product));
  });
  readonly #router: Router = inject(Router);
  readonly #store: Store<
    CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState
  > = inject(
    Store<CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState>
  );
  readonly #allProductsLookUp = this.#store.selectSignal(
    CatalogueSelectors.allProductsLookUp
  );
  readonly #wishlist = this.#store.selectSignal(CartSelectors.wishlist);

  ngOnInit(): void {
    this.#store.dispatch(
      CatalogueActions.fetchProducts({
        progressActionType: ProgressType.Start,
      })
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
