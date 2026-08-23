import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, map, tap } from 'rxjs';
import {
  CartProduct,
  CartActions,
  CartFeature,
  CartSelectors,
  CartStateModule,
} from '@shoppers-point/cart-state';
import { Router, RouterModule } from '@angular/router';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors,
} from '@shoppers-point/catalogue-state';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { CommonModule } from '@angular/common';
import { UserStateModule } from '@shoppers-point/user-state';
import { SummaryComponent } from '../summary/summary.component';
import { ProgressType } from '@shoppers-point/progress-state';

@Component({
  selector: 'shoppers-point-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    RouterModule,
    CartStateModule,
    UserStateModule,
    SummaryComponent,
    ProductsTableComponent,
  ],
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<CartProduct[] | undefined> = EMPTY;
  readonly #router: Router = inject(Router);
  readonly #store: Store<
    CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState
  > = inject(
    Store<CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState>
  );

  ngOnInit(): void {
    this.#store.dispatch(
      CatalogueActions.fetchProducts({
        progressActionType: ProgressType.Start,
      })
    );
    this.products$ = combineLatest([
      this.#store.select(CatalogueSelectors.allProductsLookUp),
      this.#store.select(CartSelectors.products),
    ]).pipe(
      tap(([productsLookUp]) => {
        console.log(productsLookUp);
      }),
      map(([productsLookUp, cartProducts]) =>
        cartProducts.map((cartProduct: CartProduct) => ({
          ...cartProduct,
          ...productsLookUp[cartProduct.id],
        }))
      )
    );
  }

  onProductSelected(productId: number): void {
    this.#router.navigate([`/product-details/${productId}`]);
  }

  onCheckout(): void {
    this.#router.navigate(['/checkout']);
  }

  onUpdateCartQuantity(product: CartProduct): void {
    this.#store.dispatch(CartActions.updateProductQuantity(product));
  }

  onProductRemoved(id: number): void {
    this.#store.dispatch(CartActions.removeProduct({ id }));
  }
}
