import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard, loggedInGuard } from '@shoppers-point/auth-ui';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'shop',
        loadChildren: () =>
          import('@shoppers-point/catalogue-ui').then(({ routes }) => routes),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('@shoppers-point/cart-ui').then(({ routes }) => routes),
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadChildren: () =>
          import('@shoppers-point/checkout-ui').then(({ routes }) => routes),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@shoppers-point/contact-ui').then(({ routes }) => routes),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('@shoppers-point/home-ui').then(({ routes }) => routes),
      },
      {
        path: 'auth',
        canActivateChild: [loggedInGuard],
        loadChildren: () =>
          import('@shoppers-point/auth-ui').then(({ routes }) => routes),
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('@shoppers-point/wishlist-ui').then(({ routes }) => routes),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('@shoppers-point/product-details-ui').then(
            ({ routes }) => routes
          ),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'error',
    loadChildren: () =>
      import('@shoppers-point/error-ui').then(({ routes }) => routes),
  },
  {
    path: '**',
    redirectTo: 'error/404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
