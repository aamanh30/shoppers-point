import { createAction, props } from '@ngrx/store';
import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';

export enum CartActionTypes {
  FetchCart = '[Cart] Fetch Cart',
  FetchCartSuccess = '[Cart] Fetch Cart Success',
  FetchError = '[Cart] Fetch Error',
  UpdateCart = '[Cart] Update Cart',
  UpdateCartSuccess = '[Cart] Update Cart Success',
  UpdateWishlist = '[Cart] Update Wish List',
  UpdateWishlistSuccess = '[Cart] Update Wish List Success'
}

export const fetchCart = createAction(CartActionTypes.FetchCart);

export const fetchCartSuccess = createAction(
  CartActionTypes.FetchCartSuccess,
  props<{ id: number; products: CartProduct[] }>()
);

export const fetchError = createAction(
  CartActionTypes.FetchError,
  props<{ error: Partial<Error> }>()
);

export const updateCart = createAction(
  CartActionTypes.UpdateCart,
  props<{ productId: number; action: CartAction; quantity: number }>()
);

export const updateCartSuccess = createAction(
  CartActionTypes.UpdateCartSuccess,
  props<{ products: CartProduct[] }>()
);

export const updateWishlist = createAction(
  CartActionTypes.UpdateWishlist,
  props<{ productId: number }>()
);

export const updateWishlistSuccess = createAction(
  CartActionTypes.UpdateWishlistSuccess,
  props<{ wishlist: number[] }>()
);
