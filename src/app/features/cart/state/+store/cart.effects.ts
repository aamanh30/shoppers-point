import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { concatMap, map, catchError, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  fetchCart,
  fetchCartSuccess,
  fetchError,
  setCartAndWishlist,
  updateCart,
  updateCartSuccess,
  updateWishlist,
  updateWishlistSuccess,
} from './cart.actions';
import { CartService } from './cart.service';
import { Action, Store } from '@ngrx/store';
import { UserFeature, UserSelectors } from '@shoppers-point/user-state';
import { products } from './cart.selectors';
import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';
import { wishlist } from './cart.selectors';
import {
  getItem,
  setItem,
  storageKeysLookup,
} from '@shoppers-point/shared-state';

@Injectable()
export class CartEffects implements OnInitEffects {
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

  setCartAndWishlist$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(setCartAndWishlist),
      mergeMap(({ products, wishlist }) => [
        updateCartSuccess({
          products,
        }),
        updateWishlistSuccess({
          wishlist,
        }),
      ])
    )
  );

  setCart$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(updateCartSuccess),
        tap(({ products }) => setItem(storageKeysLookup.cart, products))
      ),
    {
      dispatch: false,
    }
  );

  setWishlist$ = createEffect(
    () =>
      this.#actions$.pipe(
        ofType(updateWishlistSuccess),
        tap(({ wishlist }) => setItem(storageKeysLookup.wishlist, wishlist))
      ),
    {
      dispatch: false,
    }
  );

  ngrxOnInitEffects(): Action {
    const products = getItem<CartProduct[]>(storageKeysLookup.cart) ?? [];
    const wishlist = getItem<number[]>(storageKeysLookup.wishlist) ?? [];

    return setCartAndWishlist({
      products,
      wishlist,
    });
  }
}
