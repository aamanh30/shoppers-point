import { Rating } from './rating';

export interface Review {
  rating: Rating;
  message: string | undefined;
  name: string | undefined;
  email: string | undefined;
}
