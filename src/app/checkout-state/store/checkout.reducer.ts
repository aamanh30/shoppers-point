import { Action, createReducer, on } from '@ngrx/store';
import { CheckoutActions } from './checkout.actions';
import { SelectOption } from 'src/app/shared/models';
import { CHECKOUT_KEY } from './checkout-key';

const { fetchCountries, fetchCountriesSuccess } = CheckoutActions;

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
