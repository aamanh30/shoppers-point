import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Product } from '@shoppers-point/shared-ui';

@Component({
  selector: 'shoppers-point-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule],
})
export class CarouselComponent {
  product = input<Product | undefined>();
  readonly indices: number[] = [0, 1, 2, 3, 4];
  activeIndex = 0;

  onPrev(): void {
    if (this.activeIndex === this.indices[0]) {
      this.activeIndex = this.indices[this.indices.length - 1];
      return;
    }
    this.activeIndex -= 1;
  }

  onNext(): void {
    if (this.activeIndex === this.indices[this.indices.length - 1]) {
      this.activeIndex = this.indices[0];
      return;
    }
    this.activeIndex += 1;
  }
}
