import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CHECKOUT_KEY, CheckoutState } from './checkout.reducer';

const checkoutFeatureState = createFeatureSelector<CheckoutState>(CHECKOUT_KEY);

export const countries = createSelector(
  checkoutFeatureState,
  state => state.countries
);
