import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserActions } from '../../user-state';
import { ProgressType } from '../../progress-state';

const {
  authError,
  fetchUser,
  forgotPassword,
  forgotPasswordSuccess,
  resetPassword,
  resetPasswordSuccess,
  signIn,
  signInSuccess,
  signOut,
  signUp,
  signUpSuccess
} = AuthActions;

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      concatMap(({ type: _, ...form }) =>
        this.authService.signUp(form).pipe(
          concatMap(user => [
            UserActions.fetchUserSuccess(
              JSON.parse(JSON.stringify(user.multiFactor.user))
            ),
            signUpSuccess({
              progressType: ProgressType.stop,
              triggerAction: signUp.type
            })
          ]),
          catchError(error =>
            of(authError({ error, progressType: ProgressType.stop }))
          )
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      concatMap(({ email, password }) =>
        email && password
          ? this.authService.signIn({ email, password }).pipe(
              concatMap(({ user }) => [
                UserActions.fetchUserSuccess(
                  JSON.parse(JSON.stringify(user.multiFactor.user))
                ),
                signInSuccess({
                  progressType: ProgressType.stop,
                  triggerAction: signIn.type
                })
              ]),
              catchError(error =>
                of(
                  authError({
                    error,
                    progressType: ProgressType.stop,
                    triggerAction: signIn.type
                  })
                )
              )
            )
          : of(
              authError({
                error: new Error('Email and Password are mandatory'),
                progressType: ProgressType.stop,
                triggerAction: signIn.type
              })
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
          catchError(error =>
            of(
              authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: forgotPassword.type
              })
            )
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      concatMap(() =>
        this.authService.resetPassword().pipe(
          map(() =>
            resetPasswordSuccess({
              progressType: ProgressType.stop,
              triggerAction: resetPassword.type
            })
          ),
          catchError(error =>
            of(
              authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: resetPassword.type
              })
            )
          )
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      concatMap(() =>
        this.authService.signOut().pipe(
          map(() => UserActions.clearUser()),
          catchError(error =>
            of(
              authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: signOut.type
              })
            )
          )
        )
      )
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      concatMap(() =>
        this.authService.fetchUser().pipe(
          concatMap(user =>
            user
              ? [
                  UserActions.fetchUserSuccess(
                    JSON.parse(JSON.stringify(user.multiFactor.user))
                  )
                ]
              : [
                  authError({
                    error: new Error('User Details not found'),
                    progressType: ProgressType.stop,
                    triggerAction: fetchUser.type
                  })
                ]
          ),
          catchError(error =>
            of(
              authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: fetchUser.type
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
