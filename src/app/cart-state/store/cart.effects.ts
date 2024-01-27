import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartActions } from './cart.actions';
import { CartService } from '../services/cart/cart.service';
import { Store } from '@ngrx/store';
import { UserFeature, UserSelectors } from '../../user-state';
import { products } from './cart.selectors';
import { CartAction, CartProduct } from '../models';
import { wishlist } from './cart.selectors';

const {
  fetchCart,
  fetchCartSuccess,
  fetchError,
  updateCart,
  updateCartSuccess,
  updateWishlist,
  updateWishlistSuccess
} = CartActions;

@Injectable()
export class CartEffects {
  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCart),
      concatLatestFrom(() => [this.store.select(UserSelectors.user)]),
      concatMap(([_, user]) => {
        return this.cartService.fetchCart(user?.uid ?? 2).pipe(
          map(({ id, products }) => fetchCartSuccess({ id, products })),
          catchError((error: Error) => of(fetchError({ error })))
        );
      })
    )
  );

  updateCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCart),
      concatLatestFrom(() => [this.store.select(products)]),
      map(([{ productId, action, quantity }, _products]) => {
        let cartProducts = _products?.length ? [..._products] : [];
        let product: CartProduct | undefined;
        const idx = cartProducts.findIndex(
          (product: CartProduct) => product.id === productId
        );
        if (idx < 0) {
          product = {
            id: productId,
            quantity: action === CartAction.increment ? quantity : -quantity
          };
          cartProducts = [...cartProducts, product];
        } else {
          product = {
            ...cartProducts[idx],
            quantity:
              cartProducts[idx].quantity +
              (action === CartAction.increment ? quantity : -quantity)
          };
          cartProducts[idx] = product;
        }

        if (!product.quantity || product.quantity < 0) {
          cartProducts = cartProducts.filter(({ id }) => id !== product?.id);
        }

        return updateCartSuccess({
          products: cartProducts
        });
      })
    )
  );

  updateWishList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateWishlist),
      concatLatestFrom(() => [this.store.select(wishlist)]),
      map(([{ productId }, wishlist]) =>
        updateWishlistSuccess({
          wishlist: wishlist.includes(productId)
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId]
        })
      )
    )
  );

  constructor(
    private readonly store: Store<UserFeature.UserPartialState>,
    private actions$: Actions,
    private cartService: CartService
  ) {}
}
