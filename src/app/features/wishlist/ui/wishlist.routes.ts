import { Route } from '@angular/router';
import { CatalogueLoaded } from '@shoppers-point/shared-ui';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./wishlist-details/wishlist-details.component').then(
        ({ WishlistDetailsComponent }) => WishlistDetailsComponent
      ),
    canActivate: [CatalogueLoaded],
  },
];
