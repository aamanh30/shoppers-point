import { Component, Input } from '@angular/core';
import { Product } from '../../shared/models';

@Component({
  selector: 'shoppers-point-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.scss']
})
export class SpecificationsComponent {
  @Input() product: Product | undefined;

  onAdd(id: number): void {}

  onRemove(id: number): void {}
}
