import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SharedModule } from '../shared/shared.module';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CartStateModule } from '../cart-state/cart-state.module';
import { CatalogueStateModule } from '../catalogue-state';

const routes: Route[] = [
  {
    path: '',
    component: ShopComponent
  }
];

@NgModule({
  declarations: [
    FiltersComponent,
    ShopComponent,
    ProductsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CatalogueStateModule,
    CartStateModule,
    SharedModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot()
  ]
})
export class CatalogueModule {}
