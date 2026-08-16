import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shoppers-point-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [RouterModule]
})
export class MainCarouselComponent {}
