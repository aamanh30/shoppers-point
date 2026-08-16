import { inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { startProgress, stopProgress } from './progress.actions';
import {
  isStartProgressAction,
  isStopProgressAction
} from '../models/progress.utils';

@Injectable()
export class ProgressEffects {
  readonly #actions$ = inject(Actions);
  startProgress$ = createEffect(() =>
    this.#actions$.pipe(
      filter(isStartProgressAction),
      map(({ cancellable, type }) =>
        startProgress({
          triggerAction: type,
          cancellable
        })
      )
    )
  );

  stopProgress$ = createEffect(() =>
    this.#actions$.pipe(
      filter(isStopProgressAction),
      map(({ type }) => stopProgress({ triggerAction: type }))
    )
  );
}
