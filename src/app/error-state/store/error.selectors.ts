import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState } from './error.reducer';
import { ERROR_KEY } from './error-key';

const errorFeatureState = createFeatureSelector<ErrorState>(ERROR_KEY);

export const error = createSelector(errorFeatureState, state => state.error);
