import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { queryError, query, querySuccess } from './contact.actions';
import { ContactService } from './contact.service';

@Injectable()
export class ContactEffects {
  readonly #actions$: Actions = inject(Actions);
  readonly #contactService: ContactService = inject(ContactService);

  query$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(query),
      concatMap(({ query: queryDetails }) =>
        this.#contactService.query(queryDetails).pipe(
          map(() => querySuccess()),
          catchError(error => of(queryError(error)))
        )
      )
    )
  );
}
