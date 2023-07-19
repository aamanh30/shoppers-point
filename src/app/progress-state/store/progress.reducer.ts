import { Action, createReducer, on } from '@ngrx/store';
import { startProgress, stopProgress } from './progress.actions';

export const PROGRESS_KEY = 'progress';

export interface ProgressState {
  actionsInProgress: Record<string, number>;
}

export interface ProgressPartialState {
  [PROGRESS_KEY]: ProgressState;
}
export const initialProgressState: ProgressState = {
  actionsInProgress: {}
};

export const reducer = createReducer(
  initialProgressState,
  on(
    startProgress,
    (state, { triggerAction }): ProgressState => ({
      ...state,
      actionsInProgress: {
        ...state.actionsInProgress,
        [triggerAction]: (state.actionsInProgress[triggerAction] ?? 0) + 1
      }
    })
  ),
  on(
    stopProgress,
    (state, { triggerAction }): ProgressState => ({
      ...state,
      actionsInProgress: {
        ...state.actionsInProgress,
        [triggerAction]: state.actionsInProgress[triggerAction]
          ? state.actionsInProgress[triggerAction] - 1
          : 0
      }
    })
  )
);

export const progressReducer = (
  state: ProgressState | undefined,
  action: Action
) => reducer(state, action);
