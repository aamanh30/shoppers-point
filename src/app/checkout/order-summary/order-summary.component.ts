import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { CartProduct } from '../../cart-state/models';
import { Summary } from '../../checkout-state/models';
import { SelectOption } from '../../shared/models';

@Component({
  selector: 'shoppers-point-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() formValid = false;
  @Input() form = new UntypedFormGroup({});
  @Input() model: Summary | undefined;
  @Input() paymentOptions: SelectOption[] = [];
  get products() {
    return this.#products;
  }
  @Input() set products(products: CartProduct[] | undefined | null) {
    this.#products = products;
    this.shipping = products?.length ? 10 : 0;
    this.updateSummary.emit(this.products ?? []);
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

  @Output() updateSummary: EventEmitter<CartProduct[]> = new EventEmitter<
    CartProduct[]
  >();
  @Output() placeOrder: EventEmitter<void> = new EventEmitter<void>();
  fields: FormlyFieldConfig[] = [];
  shipping = 0;
  #products: CartProduct[] | undefined | null;

  ngOnInit(): void {
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col form-group',
            fieldGroup: [
              {
                key: 'paymentType',
                type: 'radio',
                props: {
                  label: 'Payment Type',
                  name: 'paymentType',
                  className: 'form-control',
                  required: true,
                  options: this.paymentOptions
                }
              }
            ]
          }
        ]
      }
    ];
  }
  onPlaceOrder(): void {
    this.placeOrder.emit();
  }
}
