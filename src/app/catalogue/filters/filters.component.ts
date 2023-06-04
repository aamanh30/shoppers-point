import { Component, Input } from '@angular/core';
import { CatalogueFilter, FilterType, Range } from '../models';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'shoppers-point-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() heading = '';
  @Input() filterType: FilterType = FilterType.list;
  @Input() range: Range | undefined | null;
  get filters() {
    return this.#filters;
  }
  @Input() set filters(filters: CatalogueFilter[] | undefined | null) {
    this.#filters = filters;
    if (filters?.length) {
      this.fields = this.#getFieldsConfig();
    }
  }
  get filterId() {
    return this.heading.toLowerCase().split(' ').join('-');
  }
  fields: FormlyFieldConfig[] = [];
  model: any = {};
  form: UntypedFormGroup = new UntypedFormGroup({});
  readonly FilterType = FilterType;
  #filters: CatalogueFilter[] | undefined | null = [];

  #getFieldsConfig(): FormlyFieldConfig[] {
    return [
      {
        key: 'category',
        type: 'checkbox',
        props: { label: this.heading },
        expressions: {
          'props.disabled': 'formState.awesomeIsForced'
        }
      }
    ];
  }
}
