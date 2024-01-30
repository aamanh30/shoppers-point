import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  combineLatest,
  map,
  takeUntil
} from 'rxjs';
import { Product, Review } from '../../shared/models';
import { Store } from '@ngrx/store';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors
} from '../../catalogue-state';
import { ActivatedRoute } from '@angular/router';
import { CartActions, CartFeature, CartSelectors } from '../../cart-state';
import { CartProduct } from '../../cart-state/models';
import {
  ProgressFeature,
  ProgressSelectors,
  ProgressType
} from '../../progress-state';

@Component({
  selector: 'shoppers-point-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  productDetails$: Observable<Product | undefined> = EMPTY;
  quantity$: Observable<number> = EMPTY;
  productDetailsLoading$: Observable<boolean> = EMPTY;

  readonly isDestroyed$: Subject<void> = new Subject<void>();
  constructor(
    private store: Store<
      CatalogueFeature.CataloguePartialState &
        CartFeature.CartPartialState &
        ProgressFeature.ProgressPartialState
    >,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productDetails$ = this.store.select(CatalogueSelectors.productDetails);
    this.productDetailsLoading$ = this.store.select(
      ProgressSelectors.hasSpecificActionInProgress(
        CatalogueActions.fetchProductDetails.type
      )
    );
    this.quantity$ = combineLatest([
      this.store.select(CartSelectors.products),
      this.productDetails$
    ]).pipe(
      map(([cartProducts, productDetails]) => {
        const cartProduct = cartProducts.find(
          product => product.id === productDetails?.id
        );

        return cartProduct?.quantity ?? 1;
      })
    );

    this.route.paramMap.pipe(takeUntil(this.isDestroyed$)).subscribe(params => {
      const id = params.get('id');
      if (!id || isNaN(Number(id))) {
        return;
      }
      this.store.dispatch(
        CatalogueActions.fetchProductDetails({
          id,
          progressType: ProgressType.start
        })
      );
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  onSubmitReview(id: number, review: Review): void {
    this.store.dispatch(
      CatalogueActions.updateProductReview({ ...review, id })
    );
  }

  onUpdateCart({ id, quantity }: CartProduct): void {
    this.store.dispatch(CartActions.updateProductQuantity({ id, quantity }));
  }
}
