import { Product } from '../../shared/models';

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
