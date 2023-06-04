import { Product } from '../../shared/models';

export interface CartProduct extends Product {
  quantity: number;
}
