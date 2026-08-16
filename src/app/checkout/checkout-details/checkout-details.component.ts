import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, combineLatest, map } from 'rxjs';
import {
  CartProduct,
  CartFeature,
  CartSelectors,
} from '@shoppers-point/cart-state';
import {
  CatalogueFeature,
  CatalogueSelectors,
} from '@shoppers-point/catalogue-state';
import { CheckoutForm } from '@shoppers-point/checkout-state';
import { getCheckoutForm, getPaymentOptions } from './checkout-form.aux';
import {
  CheckoutActions,
  CheckoutFeature,
  CheckoutSelectors,
} from '../../checkout-state';
import { SelectOption } from '@shoppers-point/shared-ui';

@Component({
  selector: 'shoppers-point-checkout-details',
  templateUrl: './checkout-details.component.html',
  styleUrls: ['./checkout-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckoutDetailsComponent {
  products$: Observable<CartProduct[] | undefined> = EMPTY;
  countries$: Observable<SelectOption[]> = EMPTY;
  paymentOptions: SelectOption[] = getPaymentOptions();
  billingForm: UntypedFormGroup = new UntypedFormGroup({});
  shippingForm: UntypedFormGroup = new UntypedFormGroup({});
  summaryForm: UntypedFormGroup = new UntypedFormGroup({});
  model: CheckoutForm = getCheckoutForm();

  constructor(
    private store: Store<
      CatalogueFeature.CataloguePartialState &
        CartFeature.CartPartialState &
        CheckoutFeature.CheckoutPartialState
    >
  ) {}

  ngOnInit(): void {
    this.countries$ = this.store.select(CheckoutSelectors.countries);
    this.products$ = combineLatest([
      this.store.select(CatalogueSelectors.allProductsLookUp),
      this.store.select(CartSelectors.products),
    ]).pipe(
      map(([allProductsLookUp, cartProducts]) =>
        cartProducts.map(cartProduct => ({
          ...cartProduct,
          ...allProductsLookUp[cartProduct.id],
        }))
      )
    );
    this.store.dispatch(CheckoutActions.fetchCountries());
  }

  onShippingAddressChanged({ target }: Event): void {
    this.model.shippingAddressRequired = !!(<HTMLInputElement>target).checked;
  }

  onUpdateSummary(items: CartProduct[]): void {
    this.model.summary = {
      ...this.model.summary,
      items,
    };
  }

  onPlaceOrder(): void {
    this.store.dispatch(
      CheckoutActions.placeOrder({
        billingAddress: this.billingForm.value,
        shippingAddress: this.shippingForm.value,
        summary: this.summaryForm.value,
      })
    );
  }
}
