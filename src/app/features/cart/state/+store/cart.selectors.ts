import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { CART_FEATURE_KEY } from './index';

const cartFeatureState = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const id = createSelector(cartFeatureState, state => state.id);

export const products = createSelector(
  cartFeatureState,
  state => state.products
);

export const wishlistMap = createSelector(
  cartFeatureState,
  state => state.wishlist
);

export const wishlist = createSelector(cartFeatureState, state =>
  Array.from(state.wishlist.values())
);
