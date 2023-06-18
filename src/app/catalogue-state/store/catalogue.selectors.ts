import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CATALOGUE_KEY,
  CatalogueState,
  catalogueAdapter
} from './catalogue.reducer';
import { toRatingLabel } from './catalogue.aux';
import { CatalogueFilters } from '../models';

const catalogueFeatureState =
  createFeatureSelector<CatalogueState>(CATALOGUE_KEY);

const { selectEntities, selectAll } = catalogueAdapter.getSelectors();

export const products = createSelector(catalogueFeatureState, state => {
  const products = selectAll(state);
  if (
    state.filters &&
    (state.filters.categories?.length ||
      state.filters.ratings?.length ||
      state.filters.range?.length)
  ) {
    return products.filter(product => {
      const { categories, ratings, range } = <CatalogueFilters>state.filters;
      let isCategory = true;
      let isRating = true;
      let isRange = true;
      if (categories?.length) {
        isCategory = categories.includes(product.category ?? '');
      }
      if (ratings?.length) {
        isRating = ratings.includes(Math.floor(product.rating?.rate ?? 0));
      }
      if (range?.length) {
        isRange = (product?.price ?? 0) <= range[0];
      }

      return (
        (state.filters?.categories?.length ? isCategory : true) &&
        (state.filters?.ratings?.length ? isRating : true) &&
        (state.filters?.range?.length ? isRange : true)
      );
    });
  }
  return products;
});

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
