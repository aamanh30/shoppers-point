import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { Rating } from '../models/rating';

@Component({
  selector: 'shoppers-point-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating: Rating | undefined;
  @Input() hideRating = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  readonly ratings: number[] = [1, 2, 3, 4, 5];

  isFar(rating: number): boolean {
    return Math.floor(this.rating?.rate ?? 0) <= rating - 1;
  }

  isFas(rating: number): boolean {
    return (
      Math.floor(this.rating?.rate ?? 0) >= rating || this.isFaStarHalf(rating)
    );
  }

  isFaStarHalf(rating: number): boolean {
    return Math.ceil(this.rating?.rate ?? 0) === rating;
  }

  onClick(rating: number): void {
    this.ratingChange.emit(rating);
  }
}
