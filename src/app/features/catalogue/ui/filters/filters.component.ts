import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
} from '@angular/core';
import {
  CatalogueFilter,
  FilterEvent,
  FilterType,
  Range,
} from '@shoppers-point/catalogue-state';

@Component({
  selector: 'shoppers-point-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule],
})
export class FiltersComponent {
  heading = input('');
  filterType = input<FilterType>(FilterType.list);
  range = input<Range | undefined | null>();
  filterChanged = output<FilterEvent>();
  filterOptions = input<CatalogueFilter[] | undefined | null>([]);
  refinedFilterOptions = computed(() =>
    this.getFilterOptions(this.filterOptions() ?? [], this.filters() ?? [])
  );
  filters = input<string[] | number[] | undefined | null>();
  filterId = computed(() => this.heading().toLowerCase().split(' ').join('-'));
  readonly FilterType = FilterType;

  getFilterOptions(
    filterOptions: CatalogueFilter[] = [],
    filters: string[] | number[] = []
  ): CatalogueFilter[] {
    return (filterOptions ?? []).map(option => ({
      ...option,
      checked: filters.includes(<never>option.label),
    }));
  }
  onFilterCheck({ checked }: HTMLInputElement, label: string | number): void {
    this.filterChanged.emit({ label, checked });
  }

  onFilterChange({ value }: HTMLInputElement, label: string | number): void {
    this.filterChanged.emit({ label, value });
  }
}
