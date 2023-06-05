import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchCart,
  fetchCartSuccess,
  updateCartSuccess,
  updateWishlistSuccess
} from './cart.actions';
import { CartProduct } from '../models/cart-product';

export const CART_KEY = 'cart';

export interface CartState {
  id: number | undefined;
  products: CartProduct[];
  wishlist: number[];
}

export interface CartPartialState {
  [CART_KEY]: CartState;
}

export const initialCartState: CartState = {
  id: undefined,
  products: [],
  wishlist: []
};

export const reducer = createReducer(
  initialCartState,
  on(
    fetchCart,
    (state): CartState => ({ ...state, id: undefined, products: [] })
  ),
  on(
    fetchCartSuccess,
    (state, { id, products }): CartState => ({ ...state, id, products })
  ),
  on(
    updateCartSuccess,
    (state, { products }): CartState => ({
      ...state,
      products
    })
  ),
  on(updateWishlistSuccess, (state, { wishlist }): CartState => {
    return {
      ...state,
      wishlist
    };
  })
);

export const cartReducer = (state: CartState | undefined, action: Action) =>
  reducer(state, action);
