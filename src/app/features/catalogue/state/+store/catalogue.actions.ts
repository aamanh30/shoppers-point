import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product, Review } from '@shoppers-point/shared-state';
import { CatalogueFilterKey } from '../models/catalogue-filter-key';
import { ProgressDecorators } from '@shoppers-point/progress-state';
import { CATALOGUE_FEATURE_KEY } from './index';

export const {
  fetchProducts,
  fetchProductsSuccess,
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchCategories,
  fetchCategoriesSuccess,
  searchProducts,
  searchProductsSuccess,
  clearSearchProducts,
  fetchError,
  setFilters,
  clearFilters,
  updateProductReview,
  updatePage,
  updateProductsPerPage,
} = createActionGroup({
  source: CATALOGUE_FEATURE_KEY,
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
    updateProductsPerPage: props<{ productsPerPage: number }>(),
  },
});
