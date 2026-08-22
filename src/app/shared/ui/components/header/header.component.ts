import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
} from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { Filter, Product, User } from '@shoppers-point/shared-state';
import { NavbarComponent } from '../navbar/navbar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'shoppers-point-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    FormlyModule,
    ReactiveFormsModule,
    NavbarComponent,
    TopbarComponent,
  ],
})
export class HeaderComponent {
  user = input<User | undefined | null>();
  wishlist = input<number[] | undefined | null>();
  productQuantities = input<number[] | undefined | null>();
  products = input<Product[] | null | undefined>();
  search = output<string>();
  selectProduct = output<number>();
  signOut = output<void>();
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: Filter = {
    search: '',
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',

      props: {
        placeholder: 'Search Products',
        keydown: this.#onSearch.bind(this),
        change: this.#onSearch.bind(this),
      },
    },
  ];
  productsVisible = signal(false);

  constructor() {
    effect(() => {
      const products = this.products();
      if (!products?.length) {
        return;
      }
      this.productsVisible.set(true);
    });
  }

  onSelectProduct(productId: number): void {
    this.selectProduct.emit(productId);
    this.productsVisible.set(false);
    this.form.reset();
  }

  onSignOut(): void {
    this.signOut.emit();
  }

  #onSearch(field: FormlyFieldConfig): void {
    this.search.emit(field.formControl?.value);
  }
}
