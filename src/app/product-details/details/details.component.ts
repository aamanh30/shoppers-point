import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject, takeUntil } from 'rxjs';
import { Product } from '../../shared/models';
import { Store } from '@ngrx/store';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors
} from '../../catalogue-state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shoppers-point-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  productDetails$: Observable<Product | undefined> = EMPTY;
  readonly isDestroyed$: Subject<void> = new Subject<void>();
  constructor(
    private store: Store<CatalogueFeature.CataloguePartialState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productDetails$ = this.store.select(CatalogueSelectors.productDetails);
    this.route.paramMap.pipe(takeUntil(this.isDestroyed$)).subscribe(params => {
      const id = params.get('id');
      if (!id || isNaN(Number(id))) {
        return;
      }
      this.store.dispatch(CatalogueActions.fetchProductDetails({ id }));
    });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  onAdd(id: number): void {}

  onRemove(id: number): void {}
}
