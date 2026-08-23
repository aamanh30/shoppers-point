import { Action, createReducer, on } from '@ngrx/store';
import { fetchCountries, fetchCountriesSuccess } from './checkout.actions';
import { SelectOption } from '@shoppers-point/shared-state';
import { CHECKOUT_FEATURE_KEY } from './index';

export interface CheckoutState {
  countries: SelectOption[];
}

export interface CheckoutPartialState {
  [CHECKOUT_FEATURE_KEY]: CheckoutState;
}
export const initialCheckoutState: CheckoutState = {
  countries: [],
};

export const reducer = createReducer(
  initialCheckoutState,
  on(fetchCountries, (state): CheckoutState => ({ ...state, countries: [] })),
  on(
    fetchCountriesSuccess,
    (state, { countries }): CheckoutState => ({ ...state, countries })
  )
);

export const checkoutReducer = (
  state: CheckoutState | undefined,
  action: Action
) => reducer(state, action);
