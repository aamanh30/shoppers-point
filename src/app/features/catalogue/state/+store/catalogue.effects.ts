import { inject, Injectable } from '@angular/core';
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
} from './catalogue.actions';
import { CatalogueService } from './catalogue.service';
import { toSearchedProducts } from '../models/catalogue.aux';
import { ProgressType } from '@shoppers-point/progress-state';

@Injectable()
export class CatalogueEffects {
  readonly #actions$: Actions = inject(Actions);
  readonly #catalogueService: CatalogueService = inject(CatalogueService);

  fetchProducts$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(fetchProducts),
      concatMap(() =>
        this.#catalogueService.fetchProducts().pipe(
          concatMap(products => [
            fetchCategories({
              progressActionType: ProgressType.Start,
            }),
            fetchProductsSuccess({
              products,
              progressActionType: ProgressType.Stop,
              triggerAction: fetchProducts.type,
            }),
          ]),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: fetchProducts.type,
              })
            )
          )
        )
      )
    )
  );

  fetchProductDetails$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(fetchProductDetails),
      concatMap(({ id }) =>
        this.#catalogueService.fetchProductDetails(id.toString()).pipe(
          map(product =>
            product
              ? fetchProductDetailsSuccess({
                  product,
                  progressActionType: ProgressType.Stop,
                  triggerAction: fetchProductDetails.type,
                })
              : fetchError({
                  error: new Error(`Product with id = ${id} not found`),
                  progressActionType: ProgressType.Stop,
                  triggerAction: fetchProductDetails.type,
                })
          ),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: fetchProductDetails.type,
              })
            )
          )
        )
      )
    )
  );

  fetchCategories$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(fetchCategories),
      concatMap(() =>
        this.#catalogueService.fetchCategories().pipe(
          map(categories =>
            fetchCategoriesSuccess({
              categories,
              progressActionType: ProgressType.Stop,
              triggerAction: fetchCategories.type,
            })
          ),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: fetchCategories.type,
              })
            )
          )
        )
      )
    )
  );

  searchProducts$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(searchProducts),
      concatMap(({ search }) =>
        this.#catalogueService.fetchProducts().pipe(
          map(products =>
            searchProductsSuccess({
              products: toSearchedProducts(products, search),
              progressActionType: ProgressType.Stop,
              triggerAction: searchProducts.type,
            })
          ),
          catchError((error: Error) =>
            of(
              fetchError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: searchProducts.type,
              })
            )
          )
        )
      )
    )
  );
}
