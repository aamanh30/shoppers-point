import { Action, createReducer, on } from '@ngrx/store';
import { clearUser, fetchUser, fetchUserSuccess } from './user.actions';
import { User } from '@shoppers-point/shared-state';
import { USER_FEATURE_KEY } from './index';

export interface UserState {
  user: User | undefined;
}

export interface UserPartialState {
  [USER_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
  user: undefined,
};

export const reducer = createReducer(
  initialUserState,
  on(fetchUser, clearUser, (): UserState => initialUserState),
  on(
    fetchUserSuccess,
    (state, { type, ...user }): UserState => ({ ...state, user })
  )
);

export const userReducer = (state: UserState | undefined, action: Action) =>
  reducer(state, action);
