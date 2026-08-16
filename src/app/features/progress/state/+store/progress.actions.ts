import { createActionGroup, props } from '@ngrx/store';
import { PROGRESS_FEATURE_KEY } from './index';
import { StartProgress } from '../models/start-progress';
import { StopProgress } from '../models/stop-progress';

type StartProgressAction = Pick<StartProgress, 'triggerAction' | 'cancellable'>;
type StopProgressAction = Pick<StopProgress, 'triggerAction'>;

export const { startProgress, stopProgress } = createActionGroup({
  source: PROGRESS_FEATURE_KEY,
  events: {
    startProgress: props<StartProgressAction>(),
    stopProgress: props<StopProgressAction>(),
  },
});
