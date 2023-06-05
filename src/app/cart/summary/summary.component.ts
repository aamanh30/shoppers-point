import { Component, Input } from '@angular/core';
import { CartProduct } from '../../cart-state/models';

@Component({
  selector: 'shoppers-point-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  get products() {
    return this.#products;
  }
  @Input() set products(products: CartProduct[] | undefined | null) {
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
  #products: CartProduct[] | undefined | null;
}
