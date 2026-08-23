import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchCountries,
  fetchCountriesSuccess,
  fetchCountriesError,
  placeOrder,
} from './checkout.actions';
import { CheckoutService } from './checkout.service';
import { toSelectOption } from '../models/checkout.aux';

@Injectable()
export class CatalogueEffects {
  readonly #actions$: Actions = inject(Actions);
  readonly #checkoutService: CheckoutService = inject(CheckoutService);

  fetchCountries$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(fetchCountries),
      concatMap(() =>
        this.#checkoutService.fetchCountries().pipe(
          map(countries =>
            fetchCountriesSuccess({ countries: toSelectOption(countries) })
          ),
          catchError((error: Error) => of(fetchCountriesError({ error })))
        )
      )
    )
  );

  placeOrder$ = createEffect(
    () => this.#actions$.pipe(ofType(placeOrder), map(console.log)),
    { dispatch: false }
  );
}
