import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  signUp,
  signUpSuccess,
  signIn,
  signInSuccess,
  forgotPassword,
  forgotPasswordSuccess,
  resetPassword,
  resetPasswordSuccess,
  signOut,
  fetchUser,
  authError,
} from './auth.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserActions } from '@shoppers-point/user-state';
import { ProgressType } from '@shoppers-point/progress-state';

@Injectable()
export class AuthEffects {
  readonly #actions$: Actions = inject(Actions);
  readonly #authService: AuthService = inject(AuthService);

  signUp$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(signUp),
      concatMap(({ type: _, ...form }) =>
        this.#authService.signUp(form).pipe(
          concatMap(user => [
            UserActions.fetchUserSuccess(
              JSON.parse(JSON.stringify(user.multiFactor.user))
            ),
            signUpSuccess({
              progressActionType: ProgressType.Stop,
              triggerAction: signUp.type,
            }),
          ]),
          catchError(error =>
            of(
              authError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: signUp.type,
              })
            )
          )
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(signIn),
      concatMap(({ email, password }) =>
        email && password
          ? this.#authService.signIn({ email, password }).pipe(
              concatMap(({ user }) => [
                UserActions.fetchUserSuccess(
                  structuredClone(user.multiFactor.user)
                ),
                signInSuccess({
                  progressActionType: ProgressType.Stop,
                  triggerAction: signIn.type,
                }),
              ]),
              catchError(error =>
                of(
                  authError({
                    error,
                    progressActionType: ProgressType.Stop,
                    triggerAction: signIn.type,
                  })
                )
              )
            )
          : of(
              authError({
                error: new Error('Email and Password are mandatory'),
                progressActionType: ProgressType.Stop,
                triggerAction: signIn.type,
              })
            )
      )
    )
  );

  forgotPassword$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(forgotPassword),
      concatMap(() =>
        this.#authService.forgotPassword().pipe(
          map(() => forgotPasswordSuccess()),
          catchError(error =>
            of(
              authError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: forgotPassword.type,
              })
            )
          )
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(resetPassword),
      concatMap(() =>
        this.#authService.resetPassword().pipe(
          map(() =>
            resetPasswordSuccess({
              progressActionType: ProgressType.Stop,
              triggerAction: resetPassword.type,
            })
          ),
          catchError(error =>
            of(
              authError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: resetPassword.type,
              })
            )
          )
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(signOut),
      concatMap(() =>
        this.#authService.signOut().pipe(
          map(() => UserActions.clearUser()),
          catchError(error =>
            of(
              authError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: signOut.type,
              })
            )
          )
        )
      )
    )
  );

  fetchUser$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(fetchUser),
      concatMap(() =>
        this.#authService.fetchUser().pipe(
          concatMap(user =>
            user
              ? [
                  UserActions.fetchUserSuccess(
                    structuredClone(user.multiFactor.user)
                  ),
                ]
              : [
                  authError({
                    error: new Error('User Details not found'),
                    progressActionType: ProgressType.Stop,
                    triggerAction: fetchUser.type,
                  }),
                ]
          ),
          catchError(error =>
            of(
              authError({
                error,
                progressActionType: ProgressType.Stop,
                triggerAction: fetchUser.type,
              })
            )
          )
        )
      )
    )
  );
}
