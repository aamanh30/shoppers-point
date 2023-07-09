import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../shared/models';
import { CartProduct } from '../../cart-state/models';

@Component({
  selector: 'shoppers-point-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.scss']
})
export class SpecificationsComponent {
  @Input() product: Product | undefined;
  @Input() quantity = 1;
  @Output() updateCart: EventEmitter<CartProduct> =
    new EventEmitter<CartProduct>();

  onAdd(): void {
    this.quantity += 1;
  }

  onKeyUp(productQty: string): void {
    const quantity = Number(productQty);
    if (isNaN(quantity)) {
      return;
    }
    this.quantity = quantity;
  }

  onRemove(): void {
    this.quantity -= 1;
  }

  onUpdateCart(): void {
    if (!this.product || this.quantity <= 0) {
      return;
    }
    this.updateCart.emit({
      ...this.product,
      quantity: this.quantity
    });
  }
}
