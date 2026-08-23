import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./sign-up/sign-up.component').then(
        ({ SignUpComponent }) => SignUpComponent
      ),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./sign-in/sign-in.component').then(
        ({ SignInComponent }) => SignInComponent
      ),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.component').then(
        ({ ForgotPasswordComponent }) => ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(
        ({ ResetPasswordComponent }) => ResetPasswordComponent
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
];
