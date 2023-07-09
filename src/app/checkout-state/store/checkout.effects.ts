import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchCountries,
  fetchCountriesSuccess,
  fetchError,
  placeOrder
} from './checkout.actions';
import { CheckoutService } from '../services/checkout/checkout.service';
import { toSelectOption } from './checkout.aux';

@Injectable()
export class CatalogueEffects {
  fetchCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCountries),
      concatMap(() =>
        this.checkoutService.fetchCountries().pipe(
          map(countries =>
            fetchCountriesSuccess({ countries: toSelectOption(countries) })
          ),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  placeOrder$ = createEffect(
    () => this.actions$.pipe(ofType(placeOrder), map(console.log)),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService
  ) {}
}
