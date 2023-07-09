import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CustomError,
  ErrorActions,
  ErrorFeature,
  ErrorSelectors
} from '../../error-state';
import { EMPTY, Observable, Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'shoppers-point-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.scss']
})
export class ErrorDetailsComponent implements OnInit, OnDestroy {
  error$: Observable<CustomError | undefined> = EMPTY;
  readonly destroyed$: Subject<void> = new Subject<void>();
  constructor(
    private store: Store<ErrorFeature.ErrorPartialState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.error$ = this.store.select(ErrorSelectors.error);
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        ErrorActions.loadError({ path: event.urlAfterRedirects });
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(ErrorActions.clearError());
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
