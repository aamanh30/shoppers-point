import { Action, createReducer, on } from '@ngrx/store';
import { CartActions } from './cart.actions';
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
    CartActions.fetchCart,
    (state): CartState => ({ ...state, id: undefined, products: [] })
  ),
  on(
    CartActions.fetchCartSuccess,
    (state, { id, products }): CartState => ({ ...state, id, products })
  ),
  on(
    CartActions.updateCartSuccess,
    (state, { products }): CartState => ({
      ...state,
      products
    })
  ),
  on(
    CartActions.updateProductQuantity,
    (state, { id, quantity }): CartState => {
      const productIndex = state.products.findIndex(
        product => product.id === id
      );
      if (productIndex >= 0) {
        const products = [...state.products];
        products[productIndex] = {
          id,
          quantity
        };

        return {
          ...state,
          products
        };
      }
      return {
        ...state,
        products: [...state.products, { id, quantity }]
      };
    }
  ),
  on(CartActions.updateWishlistSuccess, (state, { wishlist }): CartState => {
    return {
      ...state,
      wishlist
    };
  }),
  on(
    CartActions.removeProduct,
    (state, { id }): CartState => ({
      ...state,
      products: state.products.filter(product => product.id !== id)
    })
  )
);

export const cartReducer = (state: CartState | undefined, action: Action) =>
  reducer(state, action);
