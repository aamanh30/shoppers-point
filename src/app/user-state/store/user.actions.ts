import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models';

export enum UserActionTypes {
  FetchUser = '[User] Fetch User',
  FetchUserSuccess = '[User] Fetch User Success',
  FetchError = '[User] Fetch Error',
  ClearUser = '[User] Clear User'
}

export const fetchUser = createAction(
  UserActionTypes.FetchUser,
  props<{ id: number }>()
);

export const fetchUserSuccess = createAction(
  UserActionTypes.FetchUserSuccess,
  props<User>()
);

export const fetchError = createAction(
  UserActionTypes.FetchError,
  props<{ error: Partial<Error> }>()
);

export const clearUser = createAction(UserActionTypes.ClearUser);
