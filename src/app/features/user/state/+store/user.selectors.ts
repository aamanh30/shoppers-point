import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { USER_KEY } from './user-key';

const userFeatureState = createFeatureSelector<UserState>(USER_KEY);

export const user = createSelector(userFeatureState, state => state.user);

export const isTokenValid = createSelector(userFeatureState, state =>
  state.user ? state.user.stsTokenManager.expirationTime > Date.now() : false
);
