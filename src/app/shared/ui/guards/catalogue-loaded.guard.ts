import { inject, Injectable } from '@angular/core';
import { CanActivate, MaybeAsync } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors,
} from '@shoppers-point/catalogue-state';
import { ProgressType } from '@shoppers-point/progress-state';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogueLoaded implements CanActivate {
  readonly #state = inject(Store<CatalogueFeature.CataloguePartialState>);

  canActivate(): MaybeAsync<boolean> {
    return this.#state.select(CatalogueSelectors.allProducts).pipe(
      tap(products => {
        if (products.length > 1) return;

        this.#state.dispatch(
          CatalogueActions.fetchProducts({
            progressActionType: ProgressType.Start,
          })
        );
      }),
      map(products => products.length > 1)
    );
  }
}
