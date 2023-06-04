import { Component, Input } from '@angular/core';
import { CatalogueFilter, FilterType, Range } from '../models';

@Component({
  selector: 'shoppers-point-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() heading = '';
  @Input() filters: CatalogueFilter[] | undefined | null = [];
  @Input() filterType: FilterType = FilterType.list;
  @Input() range: Range | undefined | null;

  readonly FilterType = FilterType;

  get filterId() {
    return this.heading.toLowerCase().split(' ').join('-');
  }
}
