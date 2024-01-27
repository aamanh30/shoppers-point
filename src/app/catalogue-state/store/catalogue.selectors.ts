import { createFeatureSelector, createSelector } from '@ngrx/store';
import { toFilteredProducts, toRatingLabel } from './catalogue.aux';
import { CatalogueState, catalogueAdapter } from './catalogue.reducer';
import { CATALOGUE_KEY } from './catalogue-key';

const catalogueFeatureState =
  createFeatureSelector<CatalogueState>(CATALOGUE_KEY);

const { selectEntities, selectAll } = catalogueAdapter.getSelectors();

export const products = createSelector(catalogueFeatureState, state =>
  toFilteredProducts(selectAll(state), state.filters).slice(
    (state.page - 1) * state.productsPerPage,
    state.page * state.productsPerPage
  )
);

export const allProductsLookUp = createSelector(
  catalogueFeatureState,
  selectEntities
);

export const productDetails = createSelector(catalogueFeatureState, state => {
  const entities = selectEntities(state);
  return state.productId && entities ? entities[state.productId] : undefined;
});

export const categories = createSelector(catalogueFeatureState, state => {
  const products = selectAll(state);
  return state.categories.map(category => ({
    label: category,
    optionLabel: category,
    quantity:
      products.filter(product => product.category === category).length ?? 0
  }));
});

export const ratings = createSelector(catalogueFeatureState, state => {
  const products = selectAll(state);
  return [1, 2, 3, 4, 5].map(rating => ({
    label: rating,
    optionLabel: toRatingLabel(rating),
    quantity:
      products.filter(
        product => Math.floor(product.rating?.rate ?? 0) === rating
      ).length ?? 0
  }));
});

export const range = createSelector(catalogueFeatureState, state => {
  const prices = selectAll(state).map(product => <number>product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
});

export const searchProducts = createSelector(
  catalogueFeatureState,
  state => state.products
);

export const filters = createSelector(
  catalogueFeatureState,
  state => state.filters
);

export const page = createSelector(catalogueFeatureState, state => state.page);

export const productsPerPage = createSelector(
  catalogueFeatureState,
  state => state.productsPerPage
);

export const productsPerPageOptions = createSelector(
  catalogueFeatureState,
  _state => [5, 10, 15, 20]
);

export const pages = createSelector(catalogueFeatureState, state =>
  Array.from(
    new Array(
      Math.ceil(
        toFilteredProducts(selectAll(state), state.filters).length /
          state.productsPerPage
      )
    )
  ).map((_, i) => i + 1)
);
