import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';
import { ShopComponent } from './shop/shop.component';
import { ProductsComponent } from './products/products.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CATALOGUE_KEY, catalogueReducer } from './store/catalogue.reducer';
import { CatalogueEffects } from './store/catalogue.effects';
import { ProductCardComponent } from './product-card/product-card.component';
import { SharedModule } from '../shared/shared.module';

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
    StoreModule.forFeature(CATALOGUE_KEY, catalogueReducer),
    EffectsModule.forFeature(CatalogueEffects),
    SharedModule
  ]
})
export class CatalogueModule {}
