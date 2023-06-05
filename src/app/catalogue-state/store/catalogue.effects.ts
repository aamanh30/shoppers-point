import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchProducts,
  fetchError,
  fetchProductsSuccess,
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchCategories,
  fetchCategoriesSuccess,
  searchProducts,
  SearchProductsSuccess
} from './catalogue.actions';
import { CatalogueService } from '../services/catalogue/catalogue.service';
import { toSearchedProducts } from './catalogue.aux';

@Injectable()
export class CatalogueEffects {
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProducts),
      concatMap(() =>
        this.catalogueService.fetchProducts().pipe(
          map(products => fetchProductsSuccess({ products })),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  fetchProductDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProductDetails),
      concatMap(({ id }) =>
        this.catalogueService.fetchProductDetails(id).pipe(
          map(product => fetchProductDetailsSuccess({ product })),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProducts, fetchCategories),
      concatMap(() =>
        this.catalogueService.fetchCategories().pipe(
          map(categories => fetchCategoriesSuccess({ categories })),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchProducts),
      concatMap(({ search }) =>
        this.catalogueService.fetchProducts().pipe(
          map(products =>
            SearchProductsSuccess({
              products: toSearchedProducts(products, search)
            })
          ),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private catalogueService: CatalogueService
  ) {}
}
