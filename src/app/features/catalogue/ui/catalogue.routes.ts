import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./shop/shop.component').then(
        ({ ShopComponent }) => ShopComponent
      ),
  },
];
