import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CatalogueFilter } from '@shoppers-point/catalogue-state';

@Component({
  selector: 'shoppers-point-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class CategoriesComponent {
  categories = input<CatalogueFilter[] | null | undefined>(undefined);

  refinedCategories = computed(() => this.categories() ?? []);
}
