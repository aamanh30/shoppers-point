import { CartProduct } from '../../cart-state/models';

export interface Summary {
  paymentType?: string;
  items?: CartProduct[];
}
