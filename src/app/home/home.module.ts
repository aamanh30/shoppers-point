import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { FeaturesComponent } from './features/features.component';
import { CategoriesComponent } from './categories/categories.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { OffersComponent } from './offers/offers.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { CatalogueStateModule } from '../catalogue-state';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    MainComponent,
    MainCarouselComponent,
    FeaturesComponent,
    CategoriesComponent,
    FeaturedProductsComponent,
    OffersComponent,
    NewArrivalsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), CatalogueStateModule]
})
export class HomeModule {}
