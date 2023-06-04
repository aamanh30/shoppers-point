import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchCart,
  fetchCartSuccess,
  updateCart,
  updateCartSuccess
} from './cart.actions';
import { CartProduct } from '../models/cart-product';

export const CART_KEY = 'cart';

export interface CartState {
  id: number | undefined;
  products: Map<number, CartProduct>;
  wishList: Map<number, CartProduct>;
}

export interface CartPartialState {
  [CART_KEY]: CartState;
}

export const initialCartState: CartState = {
  id: undefined,
  products: new Map([]),
  wishList: new Map([])
};

export const reducer = createReducer(
  initialCartState,
  on(
    fetchCart,
    (state): CartState => ({ ...state, id: undefined, products: new Map([]) })
  ),
  on(
    fetchCartSuccess,
    (state, { id, products }): CartState => ({ ...state, id, products })
  ),
  on(updateCartSuccess, (state, { cart }): CartState => {
    state.products.set(cart.id, cart);
    return {
      ...state,
      products: state.products
    };
  })
);

export const cartReducer = (state: CartState | undefined, action: Action) =>
  reducer(state, action);
