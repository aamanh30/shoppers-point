import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CatalogueFilter,
  FilterEvent,
  FilterType,
  Range
} from '../../catalogue-state/models';

@Component({
  selector: 'shoppers-point-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Input() heading = '';
  @Input() filterType: FilterType = FilterType.list;
  @Input() range: Range | undefined | null;
  @Output() filterChanged: EventEmitter<FilterEvent> =
    new EventEmitter<FilterEvent>();
  get filterOptions() {
    return this.#filterOptions;
  }
  @Input() set filterOptions(
    filterOptions: CatalogueFilter[] | undefined | null
  ) {
    this.#filterOptions = this.getFilterOptions(filterOptions ?? []);
  }
  get filters() {
    return this.#filters;
  }
  @Input() set filters(filters: string[] | number[] | undefined | null) {
    this.#filters = filters ?? [];
    this.#filterOptions = this.getFilterOptions(this.filterOptions ?? []);
  }
  get filterId() {
    return this.heading.toLowerCase().split(' ').join('-');
  }
  readonly FilterType = FilterType;
  #filters: number[] | string[] = [];
  #filterOptions: CatalogueFilter[] | undefined | null = [];

  getFilterOptions(filterOptions: CatalogueFilter[]): CatalogueFilter[] {
    return (filterOptions ?? []).map(option => ({
      ...option,
      checked: (this.filters ?? []).includes(<never>option.label)
    }));
  }
  onFilterCheck({ checked }: HTMLInputElement, label: string | number): void {
    this.filterChanged.emit({ label, checked });
  }

  onFilterChange({ value }: HTMLInputElement, label: string | number): void {
    this.filterChanged.emit({ label, value });
  }
}
