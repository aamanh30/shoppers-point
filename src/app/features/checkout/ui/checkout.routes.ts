import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./checkout-details/checkout-details.component').then(
        ({ CheckoutDetailsComponent }) => CheckoutDetailsComponent
      ),
  },
];
