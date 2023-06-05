export const toRatingLabel = (rating: number): string =>
  Array.from(new Array(rating))
    .map(
      () => `<small class="text-primary fa-star fas" title="${rating}"></small>`
    )
    .join('');
