import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CATALOGUE_KEY,
  CatalogueState,
  catalogueAdapter
} from './catalogue.reducer';
import { toRatingLabel } from './catalogue.aux';

const catalogueFeatureState =
  createFeatureSelector<CatalogueState>(CATALOGUE_KEY);

const { selectEntities, selectAll } = catalogueAdapter.getSelectors();

export const products = createSelector(catalogueFeatureState, selectAll);

export const productDetails = createSelector(catalogueFeatureState, state => {
  const entities = selectEntities(state);
  return state.productId && entities ? entities[state.productId] : undefined;
});

export const categories = createSelector(catalogueFeatureState, state => {
  const products = selectAll(state);
  return state.categories.map(category => ({
    label: category,
    quantity:
      products.filter(product => product.category === category).length ?? 0
  }));
});

export const ratings = createSelector(catalogueFeatureState, state => {
  const products = selectAll(state);
  return [1, 2, 3, 4, 5].map(rating => ({
    label: toRatingLabel(rating),
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
