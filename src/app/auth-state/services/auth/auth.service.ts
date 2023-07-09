import { Injectable } from '@angular/core';
import { Observable, from, map, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthForm } from '../../models/auth-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signUp({ email, password }: AuthForm): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  signIn({ email, password }: Partial<AuthForm>): Observable<any> {
    return from(
      this.afAuth.signInWithEmailAndPassword(<string>email, <string>password)
    );
  }

  forgotPassword(): Observable<any> {
    return of({});
  }

  resetPassword(): Observable<any> {
    return of({});
  }

  signOut(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  fetchUser(): Observable<any> {
    return this.afAuth.user;
  }
}
