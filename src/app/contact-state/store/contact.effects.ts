import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { contactError, placeQuery, placeQuerySuccess } from './contact.actions';
import { ContactService } from '../services/contact/contact.service';

@Injectable()
export class ContactEffects {
  placeQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(placeQuery),
      concatMap(({ type: _, ...query }) =>
        this.contactService.placeQuery(query).pipe(
          map(() => placeQuerySuccess()),
          catchError(error => of(contactError(error)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}