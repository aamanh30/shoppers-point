import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CatalogueActions } from './catalogue.actions';
import { CatalogueService } from '../services/catalogue/catalogue.service';
import { toSearchedProducts } from './catalogue.aux';

const {
  fetchProducts,
  fetchError,
  fetchProductsSuccess,
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchCategories,
  fetchCategoriesSuccess,
  searchProducts,
  searchProductsSuccess
} = CatalogueActions;

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
        this.catalogueService.fetchProductDetails(id.toString()).pipe(
          map(product =>
            product
              ? fetchProductDetailsSuccess({ product })
              : fetchError({
                  error: new Error(`Product with id = ${id} not found`)
                })
          ),
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
            searchProductsSuccess({
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
