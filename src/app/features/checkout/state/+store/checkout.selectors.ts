import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './checkout.reducer';
import { CHECKOUT_FEATURE_KEY } from './index';

const checkoutFeatureState =
  createFeatureSelector<CheckoutState>(CHECKOUT_FEATURE_KEY);

export const countries = createSelector(
  checkoutFeatureState,
  state => state.countries
);
