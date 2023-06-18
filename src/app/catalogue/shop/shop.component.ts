import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../../shared/models';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors
} from '../../catalogue-state';
import { CartActions } from '../../cart-state';
import { CartAction } from '../../cart-state/models';
import {
  FilterType,
  CatalogueFilter,
  CatalogueFilters,
  Range,
  FilterEvent,
  CatalogueFilterKey
} from '../../catalogue-state/models';

@Component({
  selector: 'shoppers-point-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  readonly FilterType = FilterType;
  products$: Observable<Product[]> = EMPTY;
  categories$: Observable<CatalogueFilter[]> = EMPTY;
  ratings$: Observable<CatalogueFilter[]> = EMPTY;
  range$: Observable<Range> = EMPTY;
  filters$: Observable<CatalogueFilters | undefined> = EMPTY;
  productsPerPage = 5;
  constructor(
    private store: Store<CatalogueFeature.CataloguePartialState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(CatalogueSelectors.products);
    this.categories$ = this.store.select(CatalogueSelectors.categories);
    this.ratings$ = this.store.select(CatalogueSelectors.ratings);
    this.range$ = this.store.select(CatalogueSelectors.range);
    this.filters$ = this.store.select(CatalogueSelectors.filters);
    this.store.dispatch(CatalogueActions.fetchProducts());
  }

  onAddToCart(productId: number): void {
    this.store.dispatch(
      CartActions.updateCart({
        productId,
        action: CartAction.increment,
        quantity: 1
      })
    );
  }

  onAddToWishlist(productId: number): void {
    this.store.dispatch(CartActions.updateWishlist({ productId }));
  }

  onProductsPerPageChanged(productsPerPage: number): void {
    this.productsPerPage = productsPerPage;
  }

  onViewProduct(productId: number): void {
    this.router.navigate([`/product-details/${productId}`]);
  }

  onFiltersChanged(
    { label, checked, value }: FilterEvent,
    key: CatalogueFilterKey
  ): void {
    this.store.dispatch(
      CatalogueActions.setFilters({
        label,
        checked,
        value,
        key
      })
    );
  }
}
