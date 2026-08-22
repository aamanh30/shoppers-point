import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SelectOption } from '@shoppers-point/shared-state';
import { CHECKOUT_FEATURE_KEY } from './index';
import { Order } from '../models/order';

export const {
  fetchCountries,
  fetchCountriesSuccess,
  fetchCountriesError,
  placeOrder,
} = createActionGroup({
  source: CHECKOUT_FEATURE_KEY,
  events: {
    fetchCountries: emptyProps(),
    fetchCountriesSuccess: props<{ countries: SelectOption[] }>(),
    fetchCountriesError: props<{ error: Partial<Error> }>(),
    placeOrder: props<{ order: Order }>(),
  },
});
