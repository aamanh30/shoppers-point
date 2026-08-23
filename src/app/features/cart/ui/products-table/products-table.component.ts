import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  output,
  input,
} from '@angular/core';
import { CartProduct } from '@shoppers-point/cart-state';

@Component({
  selector: 'shoppers-point-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, CurrencyPipe],
})
export class ProductsTableComponent {
  products = input<CartProduct[]>([]);
  productSelected = output<number>();
  productRemoved = output<number>();
  updateCartQuantity = output<CartProduct>();

  onProductSelected(id: number): void {
    this.productSelected.emit(id);
  }

  onReduce(index: number): void {
    this.#emitUpdateCartQuantityEvent(index, -1);
  }

  onAdd(index: number): void {
    this.#emitUpdateCartQuantityEvent(index, 1);
  }

  onRemove(id: number): void {
    this.productRemoved.emit(id);
  }

  #emitUpdateCartQuantityEvent(index: number, increment: number): void {
    const products = this.products();
    this.updateCartQuantity.emit({
      id: products[index].id,
      quantity: products[index].quantity + increment,
    });
  }
}
