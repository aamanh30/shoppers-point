import { Product } from '../../shared/models';
import { CatalogueFilters } from '../models/catalogue-filters';

export const toRatingLabel = (rating: number): string =>
  Array.from(new Array(rating))
    .map(
      () => `<small class="text-primary fa-star fas" title="${rating}"></small>`
    )
    .join('');

const matchString = (
  stringInput: string | undefined = '',
  searchText: string
) => stringInput.match(new RegExp(searchText, 'ig'));

export const toSearchedProducts = (products: Product[], search: string) =>
  products.filter(
    ({ category, description, title }) =>
      matchString(category, search) ||
      matchString(description, search) ||
      matchString(title, search)
  );

export const toFilteredProducts = (
  products: Product[],
  filters: CatalogueFilters | undefined
) =>
  filters?.categories?.length ||
  filters?.ratings?.length ||
  filters?.range?.length
    ? products.filter(product => {
        const { categories, ratings, range } = filters;
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
          (filters.categories?.length ? isCategory : true) &&
          (filters.ratings?.length ? isRating : true) &&
          (filters.range?.length ? isRange : true)
        );
      })
    : products;
