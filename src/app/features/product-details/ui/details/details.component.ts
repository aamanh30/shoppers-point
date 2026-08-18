import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { EMPTY, Observable, combineLatest, map } from 'rxjs';
import { Product, Review } from '@shoppers-point/shared-ui';
import { Store } from '@ngrx/store';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors,
  CatalogueStateModule,
} from '@shoppers-point/catalogue-state';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  CartActions,
  CartFeature,
  CartSelectors,
  CartProduct,
  CartStateModule,
} from '@shoppers-point/cart-state';
import {
  ProgressFeature,
  ProgressSelectors,
  ProgressType,
} from '@shoppers-point/progress-state';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { SpecificationsComponent } from '../specifications/specifications.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'shoppers-point-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    CommonModule,
    RouterModule,
    CartStateModule,
    CatalogueStateModule,
    CarouselComponent,
    SpecificationsComponent,
    ReviewsComponent,
  ],
})
export class DetailsComponent implements OnInit {
  productDetails$: Observable<Product | undefined> = EMPTY;
  quantity$: Observable<number> = EMPTY;
  productDetailsLoading$: Observable<boolean> = EMPTY;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #store: Store<
    CatalogueFeature.CataloguePartialState &
      CartFeature.CartPartialState &
      ProgressFeature.ProgressPartialState
  > = inject(
    Store<
      CatalogueFeature.CataloguePartialState &
        CartFeature.CartPartialState &
        ProgressFeature.ProgressPartialState
    >
  );
  readonly #route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.productDetails$ = this.#store.select(
      CatalogueSelectors.productDetails
    );
    this.productDetailsLoading$ = this.#store.select(
      ProgressSelectors.hasSpecificActionInProgress(
        CatalogueActions.fetchProductDetails.type
      )
    );
    this.quantity$ = combineLatest([
      this.#store.select(CartSelectors.products),
      this.productDetails$,
    ]).pipe(
      map(([cartProducts, productDetails]) => {
        const cartProduct = cartProducts.find(
          (product: CartProduct) => product.id === productDetails?.id
        );

        return cartProduct?.quantity ?? 1;
      })
    );

    this.#route.paramMap
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(params => {
        const id = params.get('id');
        if (!id || isNaN(Number(id))) {
          return;
        }
        this.#store.dispatch(
          CatalogueActions.fetchProductDetails({
            id,
            progressActionType: ProgressType.Start,
          })
        );
      });
  }

  onSubmitReview(id: number, review: Review): void {
    this.#store.dispatch(
      CatalogueActions.updateProductReview({ ...review, id })
    );
  }

  onUpdateCart({ id, quantity }: CartProduct): void {
    this.#store.dispatch(CartActions.updateProductQuantity({ id, quantity }));
  }
}
