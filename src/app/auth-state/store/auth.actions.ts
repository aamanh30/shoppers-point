import { createAction, props } from '@ngrx/store';
import { AuthForm } from '../models/auth-form';

export enum AuthActionTypes {
  SignUp = '[Auth] Sign Up',
  SignUpSuccess = '[Auth] Sign Up Success',
  SignIn = '[Auth] Sign In',
  SignInSuccess = '[Auth] Sign In Success',
  ForgotPassword = '[Auth] Forgot Password',
  ForgotPasswordSuccess = '[Auth] Forgot Password Success',
  ResetPassword = '[Auth] Reset Password',
  ResetPasswordSuccess = '[Auth] Reset Password Success',
  SignOut = '[Auth] Sign Out',
  FetchUser = '[Auth] Fetch User',
  AuthError = '[Auth] Auth Error'
}

export const signUp = createAction(AuthActionTypes.SignUp, props<AuthForm>());

export const signUpSuccess = createAction(AuthActionTypes.SignUpSuccess);

export const signIn = createAction(
  AuthActionTypes.SignIn,
  props<Partial<AuthForm>>()
);

export const signInSuccess = createAction(AuthActionTypes.SignInSuccess);

export const forgotPassword = createAction(
  AuthActionTypes.ForgotPassword,
  props<{ email: string }>()
);

export const forgotPasswordSuccess = createAction(
  AuthActionTypes.ForgotPasswordSuccess
);

export const resetPassword = createAction(
  AuthActionTypes.ResetPassword,
  props<{ email: string; oldPassword: string; password: string }>()
);

export const resetPasswordSuccess = createAction(
  AuthActionTypes.ResetPasswordSuccess
);

export const authError = createAction(
  AuthActionTypes.AuthError,
  props<{
    error: Partial<Error>;
  }>()
);

export const signOut = createAction(AuthActionTypes.SignOut);

export const fetchUser = createAction(AuthActionTypes.FetchUser);
