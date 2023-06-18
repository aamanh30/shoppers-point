import { Action, createReducer, on } from '@ngrx/store';
import {
  clearFilters,
  clearSearchProducts,
  fetchCategories,
  fetchCategoriesSuccess,
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchProducts,
  fetchProductsSuccess,
  searchProducts,
  searchProductsSuccess,
  setFilters
} from './catalogue.actions';
import { Product } from '../../shared/models';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { CatalogueFilterKey, CatalogueFilters } from '../models';

export const CATALOGUE_KEY = 'catalogue';

export interface CatalogueState extends EntityState<Product> {
  categories: string[];
  productId: number | undefined;
  products: Product[];
  filters: CatalogueFilters | undefined;
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
    productId: undefined,
    products: [],
    filters: undefined
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
  ),
  on(
    searchProducts,
    clearSearchProducts,
    (state): CatalogueState => ({
      ...state,
      products: []
    })
  ),
  on(
    searchProductsSuccess,
    (state, { products }): CatalogueState => ({
      ...state,
      products
    })
  ),
  on(setFilters, (state, { label, key, checked, value }): CatalogueState => {
    if (checked !== undefined && checked !== null) {
      return {
        ...state,
        filters: checked
          ? {
              ...state.filters,
              [key]: Array.from(
                new Set([
                  ...((state.filters ?? {})[<CatalogueFilterKey>key] ?? []),
                  label
                ])
              )
            }
          : {
              ...state.filters,
              [key]: [
                ...((state.filters ?? {})[<CatalogueFilterKey>key] ?? [])
              ].filter(filterLabel => filterLabel !== label)
            }
      };
    }

    return {
      ...state,
      filters: {
        ...state.filters,
        [key]: [value]
      }
    };
  }),
  on(
    clearFilters,
    (state): CatalogueState => ({
      ...state,
      filters: undefined
    })
  )
);

export const catalogueReducer = (
  state: CatalogueState | undefined,
  action: Action
) => reducer(state, action);
