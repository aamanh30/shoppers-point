import { Product } from '@shoppers-point/shared-state';

export interface CartProduct extends Product {
  quantity: number;
}
