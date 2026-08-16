import { Product } from '../../shared/models/product';

export interface CartProduct extends Product {
  quantity: number;
}
