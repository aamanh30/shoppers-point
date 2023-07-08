import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ERROR_KEY, ErrorState } from './error.reducer';

const errorFeatureState = createFeatureSelector<ErrorState>(ERROR_KEY);

export const error = createSelector(errorFeatureState, state => state.error);
