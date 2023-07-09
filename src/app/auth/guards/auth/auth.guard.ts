import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { UserSelectors } from '../../../user-state';
import { environment } from '../../../../environments/environment';

export const authGuard: CanActivateFn = (_, { url }) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(UserSelectors.user).pipe(
    tap(user => {
      if (user) {
        return;
      }

      localStorage.removeItem(environment.assessTokenKey);
      router.navigate(['/auth/sign-in'], { queryParams: { url } });
    }),
    map(user => !!user)
  );
};
