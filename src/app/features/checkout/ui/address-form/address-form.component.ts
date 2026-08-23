import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { Address } from '@shoppers-point/checkout-state';
import { SelectOption } from '@shoppers-point/shared-state';
import { getAddressFields } from './address-form-fields';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shoppers-point-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, ReactiveFormsModule, FormlyModule],
})
export class AddressFormComponent {
  heading = input('');
  form = input<UntypedFormGroup>(new UntypedFormGroup({}));
  model = input<Address | undefined>(undefined);
  cities = input<SelectOption[]>([]);
  countries = input<SelectOption[]>([]);
  fields = computed<FormlyFieldConfig[]>(() =>
    getAddressFields(this.countries(), this.cities())
  );
}
