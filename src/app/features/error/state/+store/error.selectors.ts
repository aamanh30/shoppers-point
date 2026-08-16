import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ErrorState } from './error.reducer';
import { ERROR_FEATURE_KEY } from './index';

const errorFeatureState = createFeatureSelector<ErrorState>(ERROR_FEATURE_KEY);

export const error = createSelector(errorFeatureState, state => state.error);
