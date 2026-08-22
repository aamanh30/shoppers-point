import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';
import { Rating } from '@shoppers-point/shared-state';

@Component({
  selector: 'shoppers-point-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule],
})
export class RatingComponent {
  rating = input<Rating | undefined>();
  hideRating = input(false);
  ratingChange = output<number>();
  currentRating = computed(() => this.rating()?.rate ?? 0);

  readonly ratings: number[] = [1, 2, 3, 4, 5];

  isFar(rating: number): boolean {
    return Math.floor(this.currentRating()) <= rating - 1;
  }

  isFas(rating: number): boolean {
    return (
      Math.floor(this.currentRating()) >= rating || this.isFaStarHalf(rating)
    );
  }

  isFaStarHalf(rating: number): boolean {
    return Math.ceil(this.currentRating()) === rating;
  }

  onClick(rating: number): void {
    this.ratingChange.emit(rating);
  }
}
