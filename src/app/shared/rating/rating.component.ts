import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'shoppers-point-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() product: Product | undefined;
  readonly ratings: number[] = [1, 2, 3, 4, 5];

  isFar(rating: number): boolean {
    return Math.floor(this.product?.rating?.rate ?? 0) < rating - 1;
  }

  isFas(rating: number): boolean {
    return (
      Math.floor(this.product?.rating?.rate ?? 0) >= rating ||
      this.isFaStarHalf(rating)
    );
  }

  isFaStarHalf(rating: number): boolean {
    return Math.ceil(this.product?.rating?.rate ?? 0) === rating;
  }
}
