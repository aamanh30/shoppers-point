import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROGRESS_KEY, ProgressState } from './progress.reducer';

const progressFeatureState = createFeatureSelector<ProgressState>(PROGRESS_KEY);

export const hasSpecificActionInProgress = (action: string) =>
  createSelector(
    progressFeatureState,
    state => !!state.actionsInProgress[action]
  );

export const hasActionInProgress = (actions: string[]) =>
  createSelector(progressFeatureState, state =>
    actions.some(action => state.actionsInProgress[action])
  );
