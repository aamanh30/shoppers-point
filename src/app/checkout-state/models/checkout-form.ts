import { Address } from './address';
import { Summary } from './summary';

export interface CheckoutForm {
  billingAddress: Address;
  shippingAddress: Address;
  summary: Summary;
  shippingAddressRequired: boolean;
}
