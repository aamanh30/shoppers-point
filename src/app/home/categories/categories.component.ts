import { Component, Input } from '@angular/core';
import { CatalogueFilter } from '../../catalogue-state/models';

@Component({
  selector: 'shoppers-point-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @Input() categories: CatalogueFilter[] | null | undefined;
}
