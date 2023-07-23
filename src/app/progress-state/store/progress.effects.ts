import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { ProgressType } from '../models/progress-type';
import { startProgress, stopProgress } from './progress.actions';
import { StopProgress } from '../models/stop-progress';

@Injectable()
export class ProgressEffects {
  startProgress$ = createEffect(() =>
    this.actions$.pipe(
      filter((action: any) => action.progressType === ProgressType.start),
      map(({ type: triggerAction }) => startProgress({ triggerAction }))
    )
  );

  stopProgress$ = createEffect(() =>
    this.actions$.pipe(
      filter((action: any) => action.progressType === ProgressType.stop),
      map(({ triggerAction, error }) => stopProgress({ triggerAction, error }))
    )
  );

  showToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(stopProgress),
        map(({ error }: StopProgress) => {
          if (!error) {
            return;
          }

          alert(error.message);
        })
      ),
    {
      dispatch: false
    }
  );

  constructor(private actions$: Actions) {}
}
