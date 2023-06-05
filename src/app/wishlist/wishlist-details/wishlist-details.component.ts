import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, concatMap, map } from 'rxjs';
import { CartActions, CartFeature, CartSelectors } from '../../cart-state';
import { Product } from '../../shared/models';
import { CatalogueService } from '../../catalogue/services/catalogue/catalogue.service';
import { CartAction } from '../../cart-state/models';

@Component({
  selector: 'shoppers-point-wishlist-details',
  templateUrl: './wishlist-details.component.html',
  styleUrls: ['./wishlist-details.component.scss']
})
export class WishlistDetailsComponent {
  wishlist$: Observable<Product[] | undefined> = EMPTY;
  constructor(
    private store: Store<CartFeature.CartPartialState>,
    private router: Router,
    private catalogueService: CatalogueService
  ) {
    this.wishlist$ = this.store
      .select(CartSelectors.wishlist)
      .pipe(
        concatMap((productIds: number[]) =>
          combineLatest(
            productIds.map(productId =>
              this.catalogueService.fetchProductDetails(productId)
            )
          )
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
