import { Route } from '@angular/router';
import { CatalogueLoaded } from '@shoppers-point/shared-ui';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./shopping-cart/shopping-cart.component').then(
        ({ ShoppingCartComponent }) => ShoppingCartComponent
      ),
    canActivate: [CatalogueLoaded],
  },
];
