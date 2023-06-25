import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct } from '../../cart-state/models';

@Component({
  selector: 'shoppers-point-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  @Input() products: CartProduct[] = [];
  @Output() productSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() productRemoved: EventEmitter<number> = new EventEmitter<number>();
  @Output() updateCartQuantity: EventEmitter<CartProduct> =
    new EventEmitter<CartProduct>();

  onProductSelected(id: number): void {
    this.productSelected.emit(id);
  }

  onRemove(index: number): void {
    this.updateCartQuantity.emit({
      id: this.products[index].id,
      quantity: this.products[index].quantity - 1
    });
  }

  onAdd(index: number): void {
    this.updateCartQuantity.emit({
      id: this.products[index].id,
      quantity: this.products[index].quantity + 1
    });
  }

  onProductRemoved(id: number): void {
    this.productRemoved.emit(id);
  }
}
