import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { UserActions } from '../../user-state';
import { ProgressType } from '../../progress-state';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      concatMap(({ type: _, ...form }) =>
        this.authService.signUp(form).pipe(
          concatMap(user => [
            UserActions.fetchUserSuccess(
              JSON.parse(JSON.stringify(user.multiFactor.user))
            ),
            AuthActions.signUpSuccess({
              progressType: ProgressType.stop,
              triggerAction: AuthActions.signUp.type
            })
          ]),
          catchError(error =>
            of(
              AuthActions.authError({ error, progressType: ProgressType.stop })
            )
          )
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      concatMap(({ email, password }) =>
        email && password
          ? this.authService.signIn({ email, password }).pipe(
              concatMap(({ user }) => [
                UserActions.fetchUserSuccess(
                  JSON.parse(JSON.stringify(user.multiFactor.user))
                ),
                AuthActions.signInSuccess({
                  progressType: ProgressType.stop,
                  triggerAction: AuthActions.signIn.type
                })
              ]),
              catchError(error =>
                of(
                  AuthActions.authError({
                    error,
                    progressType: ProgressType.stop,
                    triggerAction: AuthActions.signIn.type
                  })
                )
              )
            )
          : of(
              AuthActions.authError({
                error: new Error('Email and Password are mandatory'),
                progressType: ProgressType.stop,
                triggerAction: AuthActions.signIn.type
              })
            )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.forgotPassword),
      concatMap(() =>
        this.authService.forgotPassword().pipe(
          map(() => AuthActions.forgotPasswordSuccess()),
          catchError(error =>
            of(
              AuthActions.authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: AuthActions.forgotPassword.type
              })
            )
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      concatMap(() =>
        this.authService.resetPassword().pipe(
          map(() =>
            AuthActions.resetPasswordSuccess({
              progressType: ProgressType.stop,
              triggerAction: AuthActions.resetPassword.type
            })
          ),
          catchError(error =>
            of(
              AuthActions.authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: AuthActions.resetPassword.type
              })
            )
          )
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      concatMap(() =>
        this.authService.signOut().pipe(
          map(() => UserActions.clearUser()),
          catchError(error =>
            of(
              AuthActions.authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: AuthActions.signOut.type
              })
            )
          )
        )
      )
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchUser),
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
                  AuthActions.authError({
                    error: new Error('User Details not found'),
                    progressType: ProgressType.stop,
                    triggerAction: AuthActions.fetchUser.type
                  })
                ]
          ),
          catchError(error =>
            of(
              AuthActions.authError({
                error,
                progressType: ProgressType.stop,
                triggerAction: AuthActions.fetchUser.type
              })
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
