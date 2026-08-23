import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./wishlist-details/wishlist-details.component').then(
        ({ WishlistDetailsComponent }) => WishlistDetailsComponent
      ),
  },
];
