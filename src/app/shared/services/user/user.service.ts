import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);
  constructor(private httpClient: HttpClient) {}

  fetchUser(id: number): Observable<User> {
    return this.httpClient
      .get<User>(`${environment.BASE_PATH}users/${id}`)
      .pipe(tap(user => this.user$.next(user)));
  }

  get user() {
    return this.user$.asObservable();
  }
}
