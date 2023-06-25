import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, map } from 'rxjs';
import { CartProduct } from '../../cart-state/models';
import { CartActions, CartFeature, CartSelectors } from '../../cart-state';
import { Router } from '@angular/router';
import { CatalogueFeature, CatalogueSelectors } from '../../catalogue-state';

@Component({
  selector: 'shoppers-point-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<CartProduct[] | undefined> = EMPTY;
  constructor(
    private store: Store<
      CatalogueFeature.CataloguePartialState & CartFeature.CartPartialState
    >,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = combineLatest([
      this.store.select(CatalogueSelectors.allProductsLookUp),
      this.store.select(CartSelectors.products)
    ]).pipe(
      map(([productsLookUp, cartProducts]) =>
        cartProducts.map((cartProduct: CartProduct) => ({
          ...cartProduct,
          ...productsLookUp[cartProduct.id]
        }))
      )
    );
  }

  onProductSelected(productId: number): void {
    this.router.navigate([`/product-details/${productId}`]);
  }

  onCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  onUpdateCartQuantity(product: CartProduct): void {
    this.store.dispatch(CartActions.updateProductQuantity(product));
  }

  onProductRemoved(id: number): void {
    this.store.dispatch(CartActions.removeProduct({ id }));
  }
}
