import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CatalogueFilter } from '@shoppers-point/catalogue-state';

@Component({
    selector: 'shoppers-point-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CategoriesComponent {
  @Input() categories: CatalogueFilter[] | null | undefined;
}
