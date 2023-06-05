import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchError, fetchUser, fetchUserSuccess } from './user.actions';
import { UserService } from '../services/user/user.service';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      concatMap(({ id }) =>
        this.userService.fetchUser(id).pipe(
          map(user => fetchUserSuccess({ user })),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
