import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthForm } from '../../models/auth-form';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signUp(data: AuthForm): Observable<any> {
    return this.httpClient.post(`${environment.BASE_PATH}sign-up`, data);
  }

  signIn(data: Partial<AuthForm>): Observable<any> {
    return this.httpClient.post(`${environment.BASE_PATH}sign-in`, data);
  }

  forgotPassword(): Observable<any> {
    return of({});
  }

  resetPassword(): Observable<any> {
    return of({});
  }
}
