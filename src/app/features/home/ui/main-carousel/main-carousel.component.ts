import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { carousel } from './carousel';
import { CarouselItem } from './carousel-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shoppers-point-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class MainCarouselComponent {
  readonly productCarousel = signal<CarouselItem[]>(carousel);
  readonly activeIndex = signal(0);
  onChangeSlide(index: number): void {
    this.activeIndex.set(index);
  }
}
