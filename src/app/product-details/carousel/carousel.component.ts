import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models';

@Component({
  selector: 'shoppers-point-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  @Input() product: Product | undefined;
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
