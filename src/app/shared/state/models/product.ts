import { Rating } from './rating';
import { Review } from './review';

export interface Product {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: Rating;
  reviews?: Partial<Review>[];
}
