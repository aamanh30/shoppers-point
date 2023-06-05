import { Component, Input } from '@angular/core';
import { CartProduct } from '../../cart-state/models';

@Component({
  selector: 'shoppers-point-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  get products() {
    return this.#products;
  }
  @Input() set products(products: CartProduct[] | undefined | null) {
    this.#products = products;
    this.shipping = products?.length ? 10 : 0;
  }

  get subTotal() {
    return (
      this.products?.reduce(
        (total, { quantity, price }) => (total += (price ?? 0) * quantity),
        0
      ) ?? 0
    );
  }

  get total() {
    return this.subTotal + this.shipping;
  }

  shipping = 0;
  #products: CartProduct[] | undefined | null;
}
