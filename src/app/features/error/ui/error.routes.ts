import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: ':code',
    loadComponent: () =>
      import('./error-details/error-details.component').then(
        ({ ErrorDetailsComponent }) => ErrorDetailsComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  },
];
