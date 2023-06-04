import { Injectable } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError, filter, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchCart,
  fetchCartSuccess,
  fetchError,
  updateCart,
  updateCartSuccess
} from './cart.actions';
import { CartService } from '../services/cart/cart.service';
import { toCartProduct, toProducts } from './cart.aux';
import { Store } from '@ngrx/store';
import { UserFeature, UserSelectors } from '../../user/store';
import { id, productsMap } from './cart.selectors';
import { CartAction } from '../models';

@Injectable()
export class CartEffects {
  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCart),
      concatLatestFrom(() => [this.store.select(UserSelectors.user)]),
      tap((...a) => console.log(`a`, a)),
      concatMap(([_, user]) => {
        return this.cartService.fetchCart(user?.id ?? 2).pipe(
          map(({ id, products }) =>
            fetchCartSuccess({ id, products: toCartProduct(products) })
          ),
          catchError((error: Error) => of(fetchError({ error })))
        );
      })
    )
  );

  updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCart),
      concatLatestFrom(() => [
        this.store.select(productsMap),
        this.store.select(id)
      ]),
      map(([{ productId, action }, productsMap, cartId]) =>
        updateCartSuccess({
          cart: {
            ...productsMap.get(productId),
            id: productsMap.get(productId)?.id ?? productId,
            quantity:
              (productsMap.get(productId)?.quantity ?? 0) + action ===
              CartAction.increment
                ? 1
                : -1
          }
        })
      ),
      tap((...args) => console.log(`args:`, args))
    )
  );

  constructor(
    private readonly store: Store<UserFeature.UserPartialState>,
    private actions$: Actions,
    private cartService: CartService
  ) {}
}
