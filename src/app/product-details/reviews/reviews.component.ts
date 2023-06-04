import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models';

@Component({
  selector: 'shoppers-point-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {
  @Input() product: Product | undefined;
}
