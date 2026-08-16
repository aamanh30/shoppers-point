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
          import('./catalogue/catalogue.module').then(m => m.CatalogueModule),
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
          import('@shoppers-point/auth-ui').then(
            ({ AuthUiModule }) => AuthUiModule
          ),
      },
      {
        path: 'wishlist',
        loadChildren: () =>
          import('@shoppers-point/wishlist-ui').then(({ routes }) => routes),
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('./product-details/product-details.module').then(
            m => m.ProductDetailsModule
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
