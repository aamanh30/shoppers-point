import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_KEY, UserState } from './user.reducer';

const userFeatureState = createFeatureSelector<UserState>(USER_KEY);

export const user = createSelector(userFeatureState, state => state.user);

export const isTokenValid = createSelector(userFeatureState, state =>
  state.user ? state.user.stsTokenManager.expirationTime > Date.now() : false
);
