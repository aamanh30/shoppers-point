import { Action, createReducer, on } from '@ngrx/store';
import { clearUser, fetchUser, fetchUserSuccess } from './user.actions';
import { User } from '../../shared/models/user';

export const USER_KEY = 'userInfo';

export interface UserState {
  user: User | undefined;
}

export interface UserPartialState {
  [USER_KEY]: UserState;
}

export const initialUserState: UserState = {
  user: undefined
};

export const reducer = createReducer(
  initialUserState,
  on(fetchUser, (state): UserState => ({ ...state, user: undefined })),
  on(
    fetchUserSuccess,
    (state, { type, ...user }): UserState => ({ ...state, user })
  ),
  on(clearUser, (): UserState => initialUserState)
);

export const userReducer = (state: UserState | undefined, action: Action) =>
  reducer(state, action);
