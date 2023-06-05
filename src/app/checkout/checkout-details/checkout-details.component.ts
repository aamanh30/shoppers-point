import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, concatMap, map } from 'rxjs';
import { CartProduct } from '../../cart-state/models';
import { CartFeature, CartSelectors } from '../../cart-state';
import { CatalogueService } from '../../catalogue-state/services/catalogue/catalogue.service';
import { Product } from '../../shared/models';

@Component({
  selector: 'shoppers-point-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss']
})
export class CheckoutDetailsComponent {
  products$: Observable<CartProduct[] | undefined> = EMPTY;
  constructor(
    private store: Store<CartFeature.CartPartialState>,
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
            return (<Product[]>cartProducts).map(cartProduct => ({
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
}
