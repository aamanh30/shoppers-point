import { CartProduct } from '@shoppers-point/cart-state';

export interface Summary {
  paymentType?: string;
  items?: CartProduct[];
}
