import { Route, RouterModule } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./main/main.component').then(({ MainComponent }) => MainComponent)
  }
];
