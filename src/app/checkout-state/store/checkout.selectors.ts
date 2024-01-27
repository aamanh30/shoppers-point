import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.reducer';
import { CHECKOUT_KEY } from './checkout-key';

const checkoutFeatureState = createFeatureSelector<CheckoutState>(CHECKOUT_KEY);

export const countries = createSelector(
  checkoutFeatureState,
  state => state.countries
);
