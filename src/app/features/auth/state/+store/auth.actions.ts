import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthForm } from '../models/auth-form';
import { ProgressDecorators } from '@shoppers-point/progress-state';
import { AUTH_FEATURE_KEY } from './index';

export const AuthActions = createActionGroup({
  source: AUTH_FEATURE_KEY,
  events: {
    signUp: props<AuthForm & ProgressDecorators>(),
    signUpSuccess: props<ProgressDecorators>(),
    signIn: props<Partial<AuthForm> & ProgressDecorators>(),
    signInSuccess: props<ProgressDecorators>(),
    forgotPassword: props<{ email: string } & ProgressDecorators>(),
    forgotPasswordSuccess: emptyProps(),
    resetPassword: props<
      {
        email: string;
        oldPassword: string;
        password: string;
      } & ProgressDecorators
    >(),
    resetPasswordSuccess: props<ProgressDecorators>(),
    signOut: emptyProps(),
    fetchUser: emptyProps(),
    authError: props<
      {
        error: Partial<Error>;
      } & ProgressDecorators
    >(),
  },
});
