import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthForm } from '../models/auth-form';
import { AUTH_KEY } from './auth-key';

export const AuthActions = createActionGroup({
  source: AUTH_KEY,
  events: {
    signUp: props<AuthForm>(),
    signUpSuccess: emptyProps(),
    signIn: props<Partial<AuthForm>>(),
    signInSuccess: emptyProps(),
    forgotPassword: props<{ email: string }>(),
    forgotPasswordSuccess: emptyProps(),
    resetPassword: props<{
      email: string;
      oldPassword: string;
      password: string;
    }>(),
    resetPasswordSuccess: emptyProps(),
    authError: props<{
      error: Partial<Error>;
    }>(),
    signOut: emptyProps(),
    fetchUser: emptyProps()
  }
});
