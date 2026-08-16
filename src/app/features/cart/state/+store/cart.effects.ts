import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchCart,
  fetchCartSuccess,
  fetchError,
  updateCart,
  updateCartSuccess,
  updateWishlist,
  updateWishlistSuccess,
} from './cart.actions';
import { CartService } from './cart.service';
import { Store } from '@ngrx/store';
import { UserFeature, UserSelectors } from '@shoppers-point/user-state';
import { products } from './cart.selectors';
import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';
import { wishlist } from './cart.selectors';

@Injectable()
export class CartEffects {
  readonly #store: Store<UserFeature.UserPartialState> = inject(
    Store<UserFeature.UserPartialState>
  );
  readonly #actions$: Actions = inject(Actions);
  readonly #cartService: CartService = inject(CartService);

  fetchCart$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(fetchCart),
      concatLatestFrom(() => [this.#store.select(UserSelectors.user)]),
      concatMap(([_, user]) => {
        return this.#cartService.fetchCart(user?.uid ?? 2).pipe(
          map(({ id, products }) => fetchCartSuccess({ id, products })),
          catchError((error: Error) => of(fetchError({ error })))
        );
      })
    )
  );

  updateCart$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(updateCart),
      concatLatestFrom(() => [this.#store.select(products)]),
      map(([{ productId, action, quantity }, _products]) => {
        let cartProducts = _products?.length ? [..._products] : [];
        let product: CartProduct | undefined;
        const idx = cartProducts.findIndex(
          (product: CartProduct) => product.id === productId
        );
        if (idx < 0) {
          product = {
            id: productId,
            quantity: action === CartAction.increment ? quantity : -quantity,
          };
          cartProducts = [...cartProducts, product];
        } else {
          product = {
            ...cartProducts[idx],
            quantity:
              cartProducts[idx].quantity +
              (action === CartAction.increment ? quantity : -quantity),
          };
          cartProducts[idx] = product;
        }

        if (!product?.quantity || product.quantity < 0) {
          cartProducts = cartProducts.filter(({ id }) => id !== product?.id);
        }

        return updateCartSuccess({
          products: cartProducts,
        });
      })
    )
  );

  updateWishList$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(updateWishlist),
      concatLatestFrom(() => [this.#store.select(wishlist)]),
      map(([{ productId }, wishlist]) =>
        updateWishlistSuccess({
          wishlist: wishlist.includes(productId)
            ? wishlist.filter((id: number) => id !== productId)
            : [...wishlist, productId],
        })
      )
    )
  );
}
