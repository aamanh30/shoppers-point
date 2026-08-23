import { Action, createReducer, on } from '@ngrx/store';
import { startProgress, stopProgress } from './progress.actions';
import { PROGRESS_FEATURE_KEY } from './index';

export interface ProgressState {
  actionsInProgress: Record<string, number>;
}

export interface ProgressPartialState {
  readonly [PROGRESS_FEATURE_KEY]: ProgressState;
}
export const initialProgressState: ProgressState = {
  actionsInProgress: {}
};

export const reducer = createReducer(
  initialProgressState,
  on(
    startProgress,
    (state, { triggerAction, cancellable }): ProgressState => ({
      ...state,
      actionsInProgress: {
        ...state.actionsInProgress,
        [triggerAction]: cancellable
          ? 1
          : (state.actionsInProgress[triggerAction] ?? 0) + 1
      }
    })
  ),
  on(
    stopProgress,
    (state, { triggerAction }): ProgressState => ({
      ...state,
      actionsInProgress: {
        ...state.actionsInProgress,
        [triggerAction]: Math.max(
          (state.actionsInProgress[triggerAction] ?? 0) - 1,
          0
        )
      }
    })
  )
);

export const progressReducer = (
  state: ProgressState | undefined,
  action: Action
) => reducer(state, action);
