import { Action, createReducer, on } from '@ngrx/store';
import {
  fetchCategories,
  fetchCategoriesSuccess,
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchProducts,
  fetchProductsSuccess
} from './catalogue.actions';
import { Product } from '../../shared/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const CATALOGUE_KEY = 'catalogue';

export interface CatalogueState extends EntityState<Product> {
  categories: string[];
  productId: number | undefined;
}

export interface CataloguePartialState extends EntityState<Product> {
  [CATALOGUE_KEY]: CatalogueState;
}
export const catalogueAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>({
    selectId: (product: Product) => product.id
  });

export const initialCatalogueState: CatalogueState =
  catalogueAdapter.getInitialState({
    categories: [],
    productId: undefined
  });

export const reducer = createReducer(
  initialCatalogueState,
  on(
    fetchProducts,
    (state): CatalogueState =>
      catalogueAdapter.removeAll({ ...state, productId: undefined })
  ),
  on(
    fetchProductsSuccess,
    (state, { products }): CatalogueState =>
      catalogueAdapter.setAll(products, { ...state })
  ),
  on(
    fetchProductDetails,
    (state): CatalogueState => ({ ...state, productId: undefined })
  ),
  on(
    fetchProductDetailsSuccess,
    (state, { product }): CatalogueState =>
      catalogueAdapter.upsertOne(product, {
        ...state,
        productId: product.id
      })
  ),
  on(
    fetchCategories,
    (state): CatalogueState => ({ ...state, categories: [] })
  ),
  on(
    fetchCategoriesSuccess,
    (state, { categories }): CatalogueState => ({ ...state, categories })
  )
);

export const catalogueReducer = (
  state: CatalogueState | undefined,
  action: Action
) => reducer(state, action);
