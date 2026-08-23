import { inject, Service } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';

@Service()
export class UserService {
  readonly #afAuth: AngularFireAuth = inject(AngularFireAuth);

  fetchUser(): Observable<unknown> {
    return from(this.#afAuth.currentUser);
  }
}
