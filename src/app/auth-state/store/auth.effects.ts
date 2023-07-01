import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authError,
  forgotPassword,
  forgotPasswordSuccess,
  resetPassword,
  resetPasswordSuccess,
  signIn,
  signInSuccess,
  signUp,
  signUpSuccess
} from './auth.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      concatMap(form =>
        this.authService.signUp(form).pipe(
          map(() => signUpSuccess()),
          catchError(error => of(authError({ error })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      concatMap(({ email, password }) =>
        this.authService.signIn({ email, password }).pipe(
          map(() => signInSuccess()),
          catchError(error => of(authError({ error })))
        )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forgotPassword),
      concatMap(() =>
        this.authService.forgotPassword().pipe(
          map(() => forgotPasswordSuccess()),
          catchError(error => of(authError({ error })))
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      concatMap(() =>
        this.authService.resetPassword().pipe(
          map(() => resetPasswordSuccess()),
          catchError(error => of(authError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
