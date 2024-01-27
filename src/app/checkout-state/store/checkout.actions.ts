import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Address } from '../models/address';
import { CartProduct } from '../../cart-state/models';
import { SelectOption } from 'src/app/shared/models';
import { CHECKOUT_KEY } from './checkout-key';

export const CheckoutActions = createActionGroup({
  source: CHECKOUT_KEY,
  events: {
    fetchCountries: emptyProps(),
    fetchCountriesSuccess: props<{ countries: SelectOption[] }>(),
    fetchError: props<{ error: Partial<Error> }>(),
    placeOrder: props<{
      billingAddress: Address;
      shippingAddress: Address;
      summary: CartProduct[];
    }>()
  }
});
