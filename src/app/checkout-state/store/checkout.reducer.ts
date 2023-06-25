import { Action, createReducer, on } from '@ngrx/store';
import { fetchCountries, fetchCountriesSuccess } from './checkout.actions';
import { SelectOption } from 'src/app/shared/models';

export const CHECKOUT_KEY = 'checkout';

export interface CheckoutState {
  countries: SelectOption[];
}

export interface CheckoutPartialState {
  [CHECKOUT_KEY]: CheckoutState;
}
export const initialCheckoutState: CheckoutState = {
  countries: []
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
