import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { SharedModule } from '../shared/shared.module';

const routes: Route[] = [
  {
    path: ':id',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [
    DetailsComponent,
    CarouselComponent,
    SpecificationsComponent,
    ReviewsComponent,
    ReviewFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CatalogueModule,
    SharedModule
  ]
})
export class ProductDetailsModule {}
