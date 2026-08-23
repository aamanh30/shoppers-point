import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: ':id',
    loadComponent: () =>
      import('./details/details.component').then(
        ({ DetailsComponent }) => DetailsComponent
      ),
  },
];
