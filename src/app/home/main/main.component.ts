import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import {
  CatalogueActions,
  CatalogueFeature,
  CatalogueSelectors
} from '../../catalogue-state';
import { CatalogueFilter } from '../../catalogue-state/models';

@Component({
  selector: 'shoppers-point-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  categories$: Observable<CatalogueFilter[]> = EMPTY;
  constructor(private store: Store<CatalogueFeature.CataloguePartialState>) {}

  ngOnInit(): void {
    this.categories$ = this.store.select(CatalogueSelectors.categories);
    this.store.dispatch(CatalogueActions.fetchProducts());
  }
}
