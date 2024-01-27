import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, Review } from '../../shared/models';
import { CatalogueFilterKey } from '../models/catalogue-filter-key';
import { CATALOGUE_KEY } from './catalogue-key';

export const CatalogueActions = createActionGroup({
  source: CATALOGUE_KEY,
  events: {
    fetchProducts: emptyProps(),
    fetchProductsSuccess: props<{ products: Product[] }>(),
    fetchProductDetails: props<{ id: number | string }>(),
    fetchProductDetailsSuccess: props<{ product: Product }>(),
    fetchCategories: emptyProps(),
    fetchCategoriesSuccess: props<{ categories: string[] }>(),
    searchProducts: props<{ search: string }>(),
    searchProductsSuccess: props<{ products: Product[] }>(),
    clearSearchProducts: emptyProps(),
    fetchError: props<{ error: Partial<Error> }>(),
    setFilters: props<{
      label: string | number;
      key: CatalogueFilterKey;
      checked?: boolean;
      value?: string;
    }>(),
    clearFilters: emptyProps(),
    updateProductReview: props<Review & { id: number }>()
  }
});
