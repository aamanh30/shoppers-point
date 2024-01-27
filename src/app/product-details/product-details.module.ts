import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SpecificationsComponent } from './specifications/specifications.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewFormComponent } from './review-form/review-form.component';
import { CatalogueModule } from '../catalogue/catalogue.module';
import { CartStateModule } from '../cart-state';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { types } from '../shared/formly-types-config';
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
    NgbNavModule,
    CatalogueModule,
    CartStateModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot(),
    SharedModule
  ]
})
export class ProductDetailsModule {}
