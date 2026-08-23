import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors,
  CatalogueFilter,
  CatalogueStateModule,
} from '@shoppers-point/catalogue-state';
import { ProgressType } from '@shoppers-point/progress-state';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from '../categories/categories.component';
import { FeaturesComponent } from '../features/features.component';
import { FeaturedProductsComponent } from '../featured-products/featured-products.component';
import { MainCarouselComponent } from '../main-carousel/main-carousel.component';
import { NewArrivalsComponent } from '../new-arrivals/new-arrivals.component';
import { OffersComponent } from '../offers/offers.component';

@Component({
  selector: 'shoppers-point-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    CatalogueStateModule,
    CategoriesComponent,
    FeaturesComponent,
    FeaturedProductsComponent,
    MainCarouselComponent,
    NewArrivalsComponent,
    OffersComponent,
  ],
})
export class MainComponent {
  categories$: Observable<CatalogueFilter[]> = EMPTY;
  readonly #store: Store<CatalogueFeature.CataloguePartialState> = inject(
    Store<CatalogueFeature.CataloguePartialState>
  );

  ngOnInit(): void {
    this.categories$ = this.#store.select(CatalogueSelectors.categories);
    this.#store.dispatch(
      CatalogueActions.fetchProducts({
        progressActionType: ProgressType.Start,
      })
    );
  }
}
