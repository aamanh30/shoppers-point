import { Action, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../../shared/models/user';
import { USER_KEY } from './user-key';

const { clearUser, fetchUser, fetchUserSuccess } = UserActions;

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
