import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@shoppers-point/shared-state';
import { USER_FEATURE_KEY } from './index';

export const { fetchUser, fetchUserSuccess, fetchError, clearUser } =
  createActionGroup({
    source: USER_FEATURE_KEY,
    events: {
      fetchUser: props<{ id: number }>(),
      fetchUserSuccess: props<User>(),
      fetchError: props<{ error: Partial<Error> }>(),
      clearUser: emptyProps(),
    },
  });
