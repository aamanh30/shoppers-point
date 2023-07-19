import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { ProgressType } from '../models/progress-type';
import { startProgress, stopProgress } from './progress.actions';

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
      map(({ triggerAction }) => stopProgress({ triggerAction }))
    )
  );

  constructor(private actions$: Actions) {}
}
