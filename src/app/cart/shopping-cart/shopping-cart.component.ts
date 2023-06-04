import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, concatMap, map } from 'rxjs';
import { CartProduct } from '../models';
import { CartFeature, CartSelectors } from '../store';
import { CatalogueService } from '../../catalogue/services/catalogue/catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'shoppers-point-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<CartProduct[] | undefined> = EMPTY;
  constructor(
    private store: Store<CartFeature.CartPartialState>,
    private router: Router,
    private catalogueService: CatalogueService
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(CartSelectors.products).pipe(
      concatMap(products =>
        combineLatest(
          (products ?? []).map(({ id }) =>
            this.catalogueService.fetchProductDetails(id)
          )
        ).pipe(
          map(cartProducts => {
            return cartProducts.map(cartProduct => ({
              ...cartProduct,
              quantity: (<CartProduct>(
                products.find(({ id }) => cartProduct.id === id)
              )).quantity
            }));
          })
        )
      )
    );
  }

  onProductSlected(productId: number): void {
    this.router.navigate([`/product-details/${productId}`]);
  }
}
