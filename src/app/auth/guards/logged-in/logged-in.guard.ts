import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { UserSelectors } from '../../../user-state';
import { environment } from '../../../../environments/environment';

export const loggedInGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(UserSelectors.isTokenValid).pipe(
    tap(isTokenValid => {
      if (!isTokenValid) {
        localStorage.removeItem(environment.assessTokenKey);
        return;
      }

      router.navigate(['/shop']);
    }),
    map(isTokenValid => !isTokenValid)
  );
};
