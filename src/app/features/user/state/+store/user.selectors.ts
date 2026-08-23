import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';
import { USER_FEATURE_KEY } from './index';

const userFeatureState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const user = createSelector(userFeatureState, state => state.user);

export const isTokenValid = createSelector(user, loggedInUser =>
  loggedInUser
    ? loggedInUser.stsTokenManager.expirationTime > Date.now()
    : false
);
