import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CartProduct } from '@shoppers-point/cart-state';

@Component({
    selector: 'shoppers-point-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SummaryComponent {
  @Output() checkout: EventEmitter<void> = new EventEmitter<void>();
  get products() {
    return this.#products;
  }
  @Input() set products(products: CartProduct[]) {
    this.shipping = this.products?.length ? 10 : 0;
    this.#products = products;
  }
  get total() {
    return (this.products ?? []).reduce(
      (total, { price, quantity }) => (total += (price ?? 0) * quantity),
      0
    );
  }
  shipping = 10;
  #products: CartProduct[] = [];

  onCheckout(): void {
    this.checkout.emit();
  }

  getTotal(): number {
    return this.products.reduce(
      (total, { price, quantity }) => (total += price * quantity),
      0
    );
  }
}
