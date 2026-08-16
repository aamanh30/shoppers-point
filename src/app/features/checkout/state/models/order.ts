import { CartProduct } from '@shoppers-point/cart-state';
import { Address } from './address';

export type Order = {
  billingAddress: Address;
  shippingAddress: Address;
  summary: CartProduct[];
};
