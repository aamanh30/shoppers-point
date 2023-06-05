import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models';

export enum CatalogueActionTypes {
  FetchProducts = '[Catalogue] Fetch Products',
  FetchProductsSuccess = '[Catalogue] Fetch Products Success',
  FetchProductDetails = '[Catalogue] Fetch Product Details',
  FetchProductDetailsSuccess = '[Catalogue] Fetch Product Details Success',
  FetchCategories = '[Catalogue] Fetch Categories',
  FetchCategoriesSuccess = '[Catalogue] Fetch Categories Success',
  FetchError = '[Catalogue] Fetch Error'
}

export const fetchProducts = createAction(CatalogueActionTypes.FetchProducts);

export const fetchProductsSuccess = createAction(
  CatalogueActionTypes.FetchProductsSuccess,
  props<{ products: Product[] }>()
);

export const fetchProductDetails = createAction(
  CatalogueActionTypes.FetchProductDetails,
  props<{ id: number | string }>()
);

export const fetchProductDetailsSuccess = createAction(
  CatalogueActionTypes.FetchProductDetailsSuccess,
  props<{ product: Product }>()
);

export const fetchCategories = createAction(
  CatalogueActionTypes.FetchCategories
);

export const fetchCategoriesSuccess = createAction(
  CatalogueActionTypes.FetchCategoriesSuccess,
  props<{ categories: string[] }>()
);

export const fetchError = createAction(
  CatalogueActionTypes.FetchError,
  props<{ error: Partial<Error> }>()
);
