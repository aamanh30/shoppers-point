import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  CustomError,
  ErrorActions,
  ErrorFeature,
  ErrorSelectors,
} from 'src/app/features/error/state';
import { EMPTY, filter, Observable } from 'rxjs';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shoppers-point-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CommonModule, RouterModule],
})
export class ErrorDetailsComponent implements OnInit, OnDestroy {
  error$: Observable<CustomError | undefined> = EMPTY;
  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #router: Router = inject(Router);
  readonly #store: Store<ErrorFeature.ErrorPartialState> = inject(
    Store<ErrorFeature.ErrorPartialState>
  );

  ngOnInit(): void {
    this.error$ = this.#store.select(ErrorSelectors.error);
    this.#router.events
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(({ urlAfterRedirects }: NavigationEnd) =>
        ErrorActions.loadError({ path: urlAfterRedirects })
      );
  }

  ngOnDestroy(): void {
    this.#store.dispatch(ErrorActions.clearError());
  }
}
