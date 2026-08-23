import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./shopping-cart/shopping-cart.component').then(
        ({ ShoppingCartComponent }) => ShoppingCartComponent
      ),
  },
];
