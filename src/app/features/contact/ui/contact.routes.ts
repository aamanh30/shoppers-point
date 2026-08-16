import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./contact-details/contact-details.component').then(
        ({ ContactDetailsComponent }) => ContactDetailsComponent
      ),
  },
];
