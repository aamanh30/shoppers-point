import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Filter, Product, User } from '../../shared/models';

@Component({
  selector: 'shoppers-point-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() user: User | undefined | null;
  @Input() wishlist: number[] | undefined | null;
  @Input() productQuantities: number[] | undefined | null;
  @Input() products: Product[] | null | undefined;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectProduct: EventEmitter<number> = new EventEmitter<number>();
  form: UntypedFormGroup = new UntypedFormGroup({});
  model: Filter = {
    search: ''
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'search',
      type: 'input',

      props: {
        placeholder: 'Search Products',
        keydown: this.#onSearch.bind(this),
        change: this.#onSearch.bind(this)
      }
    }
  ];

  onSelectProduct(productId: number): void {
    this.selectProduct.emit(productId);
    this.products = [];
    this.form.reset();
  }

  #onSearch(field: FormlyFieldConfig): void {
    this.search.emit(field.formControl?.value);
  }
}
