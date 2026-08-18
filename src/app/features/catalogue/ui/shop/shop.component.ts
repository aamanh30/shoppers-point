import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  CatalogueFilter,
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors,
  FilterType,
  CatalogueFilters,
  Range,
  FilterEvent,
  CatalogueFilterKey,
} from '@shoppers-point/catalogue-state';
import { CartActions, CartAction } from '@shoppers-point/cart-state';
import { Product } from '@shoppers-point/shared-ui';
import {
  ProgressFeature,
  ProgressSelectors,
  ProgressType,
} from '@shoppers-point/progress-state';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from '../filters/filters.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'shoppers-point-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, FiltersComponent, ProductsComponent],
})
export class ShopComponent implements OnInit {
  readonly FilterType = FilterType;
  products$: Observable<Product[]> = EMPTY;
  categories$: Observable<CatalogueFilter[]> = EMPTY;
  ratings$: Observable<CatalogueFilter[]> = EMPTY;
  range$: Observable<Range> = EMPTY;
  filters$: Observable<CatalogueFilters | undefined> = EMPTY;
  page$: Observable<number> = EMPTY;
  productsPerPage$: Observable<number> = EMPTY;
  pages$: Observable<number[]> = EMPTY;
  productsPerPageOptions$: Observable<number[]> = EMPTY;
  productsLoading$: Observable<boolean> = EMPTY;
  readonly #store: Store<
    CatalogueFeature.CataloguePartialState &
      ProgressFeature.ProgressPartialState
  > = inject(
    Store<
      CatalogueFeature.CataloguePartialState &
        ProgressFeature.ProgressPartialState
    >
  );
  readonly #router: Router = inject(Router);

  ngOnInit(): void {
    this.products$ = this.#store.select<Product[]>(CatalogueSelectors.products);
    this.categories$ = this.#store.select(CatalogueSelectors.categories);
    this.ratings$ = this.#store.select(CatalogueSelectors.ratings);
    this.range$ = this.#store.select(CatalogueSelectors.range);
    this.filters$ = this.#store.select(CatalogueSelectors.filters);
    this.page$ = this.#store.select(CatalogueSelectors.page);
    this.pages$ = this.#store.select(CatalogueSelectors.pages);
    this.productsPerPage$ = this.#store.select(
      CatalogueSelectors.productsPerPage
    );
    this.productsPerPageOptions$ = this.#store.select(
      CatalogueSelectors.productsPerPageOptions
    );
    this.productsLoading$ = this.#store.select(
      ProgressSelectors.hasSpecificActionInProgress(
        CatalogueActions.fetchProducts.type
      )
    );
    this.#store.dispatch(
      CatalogueActions.fetchProducts({
        progressActionType: ProgressType.Start,
      })
    );
  }

  onAddToCart(productId: number): void {
    this.#store.dispatch(
      CartActions.updateCart({
        productId,
        action: CartAction.increment,
        quantity: 1,
      })
    );
  }

  onAddToWishlist(productId: number): void {
    this.#store.dispatch(CartActions.updateWishlist({ productId }));
  }

  onProductsPerPageChanged(productsPerPage: number): void {
    this.#store.dispatch(
      CatalogueActions.updateProductsPerPage({ productsPerPage })
    );
  }

  onViewProduct(productId: number): void {
    this.#router.navigate([`/product-details/${productId}`]);
  }

  onFiltersChanged(
    { label, checked, value }: FilterEvent,
    key: CatalogueFilterKey
  ): void {
    this.#store.dispatch(
      CatalogueActions.setFilters({
        label,
        checked,
        value,
        key,
      })
    );
  }

  onPageChanged(page: number): void {
    this.#store.dispatch(CatalogueActions.updatePage({ page }));
  }
}
