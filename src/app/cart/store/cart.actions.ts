import { createAction, props } from '@ngrx/store';
import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';

export enum CartActionTypes {
  FetchCart = '[Cart] Fetch Cart',
  FetchCartSuccess = '[Cart] Fetch Cart Success',
  FetchError = '[Cart] Fetch Error',
  UpdateCart = '[Cart] Update Cart',
  UpdateCartSuccess = '[Cart] Update Cart Success',
  UpdateWishList = '[Cart] Update Wish List'
}

export const fetchCart = createAction(CartActionTypes.FetchCart);

export const fetchCartSuccess = createAction(
  CartActionTypes.FetchCartSuccess,
  props<{ id: number; products: Map<number, CartProduct> }>()
);

export const fetchError = createAction(
  CartActionTypes.FetchError,
  props<{ error: Partial<Error> }>()
);

export const updateCart = createAction(
  CartActionTypes.UpdateCart,
  props<{ productId: number; action: CartAction }>()
);

export const updateCartSuccess = createAction(
  CartActionTypes.UpdateCartSuccess,
  props<{ cart: CartProduct }>()
);

export const updateWishList = createAction(
  CartActionTypes.UpdateWishList,
  props<{ productId: number; action: CartAction }>()
);
