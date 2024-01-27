import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../shared/models';
import { USER_KEY } from './user-key';

export const UserActions = createActionGroup({
  source: USER_KEY,
  events: {
    fetchUser: props<{ id: number }>(),
    fetchUserSuccess: props<User>(),
    fetchError: props<{ error: Partial<Error> }>(),
    clearUser: emptyProps()
  }
});
