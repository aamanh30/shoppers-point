import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  fetchUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.BASE_PATH}users/${id}`);
  }
}
