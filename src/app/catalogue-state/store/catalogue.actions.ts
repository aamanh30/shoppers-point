import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, Review } from '../../shared/models';
import { CatalogueFilterKey } from '../models/catalogue-filter-key';
import { ProgressDecorators } from '../../progress-state/models';
import { CATALOGUE_KEY } from './catalogue-key';

export const CatalogueActions = createActionGroup({
  source: CATALOGUE_KEY,
  events: {
    fetchProducts: props<ProgressDecorators>(),
    fetchProductsSuccess: props<{ products: Product[] } & ProgressDecorators>(),
    fetchProductDetails: props<{ id: number | string } & ProgressDecorators>(),
    fetchProductDetailsSuccess: props<
      { product: Product } & ProgressDecorators
    >(),
    fetchCategories: props<ProgressDecorators>(),
    fetchCategoriesSuccess: props<
      { categories: string[] } & ProgressDecorators
    >(),
    searchProducts: props<{ search: string } & ProgressDecorators>(),
    searchProductsSuccess: props<
      { products: Product[] } & ProgressDecorators
    >(),
    clearSearchProducts: emptyProps(),
    fetchError: props<{ error: Partial<Error> } & ProgressDecorators>(),
    setFilters: props<{
      label: string | number;
      key: CatalogueFilterKey;
      checked?: boolean;
      value?: string;
    }>(),
    clearFilters: emptyProps(),
    updateProductReview: props<Review & { id: number }>(),
    updatePage: props<{ page: number }>(),
    updateProductsPerPage: props<{ productsPerPage: number }>()
  }
});
