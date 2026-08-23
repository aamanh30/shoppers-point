import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  output,
  computed,
  input,
} from '@angular/core';
import { CartProduct } from '@shoppers-point/cart-state';

@Component({
  selector: 'shoppers-point-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CurrencyPipe],
})
export class SummaryComponent {
  checkout = output<void>();
  products = input<CartProduct[] | undefined | null>(undefined);
  total = computed(() => {
    const products = this.products() ?? [];
    this.shipping = products.length ? 10 : 0;

    return products.reduce(
      (total, { price, quantity }) => (total += (price ?? 0) * quantity),
      0
    );
  });
  shipping = 10;

  onCheckout(): void {
    this.checkout.emit();
  }
}
