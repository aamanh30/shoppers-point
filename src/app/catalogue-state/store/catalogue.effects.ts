import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, catchError, map } from 'rxjs/operators';
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
  searchProductsSuccess,
  CatalogueActionTypes
} from './catalogue.actions';
import { CatalogueService } from '../services/catalogue/catalogue.service';
import { toSearchedProducts } from './catalogue.aux';
import { ProgressType } from 'src/app/progress-state';

@Injectable()
export class CatalogueEffects {
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProducts),
      concatMap(() =>
        this.catalogueService.fetchProducts().pipe(
          concatMap(products => [
            fetchCategories({
              progressType: ProgressType.start
            }),
            fetchProductsSuccess({
              products,
              progressType: ProgressType.stop,
              triggerAction: CatalogueActionTypes.FetchProducts
            })
          ]),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressType: ProgressType.stop,
                triggerAction: CatalogueActionTypes.FetchProducts
              })
            )
          )
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
              ? fetchProductDetailsSuccess({
                  product,
                  progressType: ProgressType.stop,
                  triggerAction: CatalogueActionTypes.FetchProductDetails
                })
              : fetchError({
                  error: new Error(`Product with id = ${id} not found`),
                  progressType: ProgressType.stop,
                  triggerAction: CatalogueActionTypes.FetchProductDetails
                })
          ),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressType: ProgressType.stop,
                triggerAction: CatalogueActionTypes.FetchProductDetails
              })
            )
          )
        )
      )
    )
  );

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCategories),
      concatMap(() =>
        this.catalogueService.fetchCategories().pipe(
          map(categories =>
            fetchCategoriesSuccess({
              categories,
              progressType: ProgressType.stop,
              triggerAction: CatalogueActionTypes.FetchCategories
            })
          ),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressType: ProgressType.stop,
                triggerAction: CatalogueActionTypes.FetchCategories
              })
            )
          )
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
              products: toSearchedProducts(products, search),
              progressType: ProgressType.stop,
              triggerAction: CatalogueActionTypes.SearchProducts
            })
          ),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressType: ProgressType.stop,
                triggerAction: CatalogueActionTypes.SearchProducts
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private catalogueService: CatalogueService
  ) {}
}
