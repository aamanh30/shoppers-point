import { createAction, props } from '@ngrx/store';
import { StartProgress, StopProgress } from '../models';

export enum ProgressActionTypes {
  StartProgress = '[Progress] Start Progress',
  StopProgress = '[Progress] Stop Progress'
}

export const startProgress = createAction(
  ProgressActionTypes.StartProgress,
  props<{ triggerAction: string } & StartProgress>()
);

export const stopProgress = createAction(
  ProgressActionTypes.StopProgress,
  props<StopProgress>()
);
