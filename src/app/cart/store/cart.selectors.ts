import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_KEY, CartState } from './cart.reducer';

const cartFeatureState = createFeatureSelector<CartState>(CART_KEY);

export const id = createSelector(cartFeatureState, state => state.id);

export const productsMap = createSelector(
  cartFeatureState,
  state => state.products
);

export const products = createSelector(cartFeatureState, state =>
  Array.from(state.products.values())
);

export const wishListMap = createSelector(
  cartFeatureState,
  state => state.wishList
);

export const wishList = createSelector(cartFeatureState, state =>
  Array.from(state.wishList.values())
);
