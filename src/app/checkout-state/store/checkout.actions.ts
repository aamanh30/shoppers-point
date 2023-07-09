import { createAction, props } from '@ngrx/store';
import { Address } from '../models/address';
import { CartProduct } from '../../cart-state/models';
import { SelectOption } from 'src/app/shared/models';

export enum CheckoutActionTypes {
  FetchCountries = '[Checkout] Fetch Countries',
  FetchCountriesSuccess = '[Checkout] Fetch Countries Success',
  PlaceOrder = '[Checkout] Place Order',
  FetchError = '[Checkout] Fetch Error'
}

export const fetchCountries = createAction(CheckoutActionTypes.FetchCountries);

export const fetchCountriesSuccess = createAction(
  CheckoutActionTypes.FetchCountriesSuccess,
  props<{ countries: SelectOption[] }>()
);

export const fetchError = createAction(
  CheckoutActionTypes.FetchError,
  props<{ error: Partial<Error> }>()
);

export const placeOrder = createAction(
  CheckoutActionTypes.PlaceOrder,
  props<{
    billingAddress: Address;
    shippingAddress: Address;
    summary: CartProduct[];
  }>()
);
