import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchError, fetchUser, fetchUserSuccess } from './user.actions';
import { UserService } from '../services/user/user.service';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUser),
      concatMap(() =>
        this.userService.fetchUser().pipe(
          map(user => fetchUserSuccess(<User>user)),
          catchError((error: Error) => of(fetchError({ error })))
        )
      )
    )
  );

  fetchUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchUserSuccess),
        map(user => {
          localStorage.setItem(environment.assessTokenKey, user.accessToken);
          this.router.navigate([
            this.route.snapshot.queryParams['url'] ?? '/shop'
          ]);
        })
      ),
    {
      dispatch: false
    }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
