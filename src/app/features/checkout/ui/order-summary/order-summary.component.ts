import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { CartProduct } from '@shoppers-point/cart-state';
import { Summary } from '@shoppers-point/checkout-state';
import { SelectOption } from '@shoppers-point/shared-state';
import { getOrderSummaryFields } from './order-summary-fields';

@Component({
  selector: 'shoppers-point-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
})
export class OrderSummaryComponent {
  formValid = input(false);
  form = input<UntypedFormGroup>(new UntypedFormGroup({}));
  model = input<Summary | undefined>(undefined);
  paymentOptions = input<SelectOption[]>([]);
  products = input<CartProduct[] | undefined | null>(undefined);
  subTotal = computed(() => {
    const products = this.products();
    if (!products) {
      return 0;
    }
    return products.reduce(
      (total, { quantity, price }) => (total += (price ?? 0) * quantity),
      0
    );
  });
  total = computed(() => this.subTotal() + this.shipping());
  fields = computed<FormlyFieldConfig[]>(() =>
    getOrderSummaryFields(this.paymentOptions())
  );
  placeOrder = output<void>();
  shipping = computed(() => {
    const products = this.products();
    return products?.length ? 10 : 0;
  });

  onPlaceOrder(): void {
    this.placeOrder.emit();
  }
}
