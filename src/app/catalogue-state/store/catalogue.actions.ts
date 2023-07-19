import { createAction, props } from '@ngrx/store';
import { Product, Review } from '../../shared/models';
import { CatalogueFilterKey } from '../models/catalogue-filter-key';
import { ProgressDecorators } from '../../progress-state/models';

export enum CatalogueActionTypes {
  FetchProducts = '[Catalogue] Fetch Products',
  FetchProductsSuccess = '[Catalogue] Fetch Products Success',
  FetchProductDetails = '[Catalogue] Fetch Product Details',
  FetchProductDetailsSuccess = '[Catalogue] Fetch Product Details Success',
  FetchCategories = '[Catalogue] Fetch Categories',
  FetchCategoriesSuccess = '[Catalogue] Fetch Categories Success',
  SearchProducts = '[Catalogue] Search Products',
  SearchProductsSuccess = '[Catalogue] Search Products Success',
  ClearSearchProducts = '[Catalogue] Clear Search Products',
  FetchError = '[Catalogue] Fetch Error',
  SetFilters = '[Catalogue] Set Filters',
  ClearFilters = '[Catalogue] Clear Filters',
  UpdateProductReview = '[Catalogue] Update Product Review',
  UpdatePage = '[Catalogue] Update Page',
  UpdateProductsPerPage = '[Catalogue] Update Products Per Page'
}

export const fetchProducts = createAction(
  CatalogueActionTypes.FetchProducts,
  props<ProgressDecorators>()
);

export const fetchProductsSuccess = createAction(
  CatalogueActionTypes.FetchProductsSuccess,
  props<{ products: Product[] } & ProgressDecorators>()
);

export const fetchProductDetails = createAction(
  CatalogueActionTypes.FetchProductDetails,
  props<{ id: number | string } & ProgressDecorators>()
);

export const fetchProductDetailsSuccess = createAction(
  CatalogueActionTypes.FetchProductDetailsSuccess,
  props<{ product: Product } & ProgressDecorators>()
);

export const fetchCategories = createAction(
  CatalogueActionTypes.FetchCategories,
  props<ProgressDecorators>()
);

export const fetchCategoriesSuccess = createAction(
  CatalogueActionTypes.FetchCategoriesSuccess,
  props<{ categories: string[] } & ProgressDecorators>()
);

export const searchProducts = createAction(
  CatalogueActionTypes.SearchProducts,
  props<{ search: string } & ProgressDecorators>()
);

export const searchProductsSuccess = createAction(
  CatalogueActionTypes.SearchProductsSuccess,
  props<{ products: Product[] } & ProgressDecorators>()
);

export const clearSearchProducts = createAction(
  CatalogueActionTypes.ClearSearchProducts
);

export const fetchError = createAction(
  CatalogueActionTypes.FetchError,
  props<{ error: Partial<Error> } & ProgressDecorators>()
);

export const setFilters = createAction(
  CatalogueActionTypes.SetFilters,
  props<{
    label: string | number;
    key: CatalogueFilterKey;
    checked?: boolean;
    value?: string;
  }>()
);

export const clearFilters = createAction(CatalogueActionTypes.ClearFilters);

export const updateProductReview = createAction(
  CatalogueActionTypes.UpdateProductReview,
  props<Review & { id: number }>()
);

export const updatePage = createAction(
  CatalogueActionTypes.UpdatePage,
  props<{ page: number }>()
);

export const updateProductsPerPage = createAction(
  CatalogueActionTypes.UpdateProductsPerPage,
  props<{ productsPerPage: number }>()
);
