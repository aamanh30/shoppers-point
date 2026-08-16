import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/contact-form';
import { environment } from '@shoppers-point/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  readonly #http: HttpClient = inject(HttpClient);

  query(data: ContactForm): Observable<ContactForm> {
    return this.#http.post<ContactForm>(
      `${environment.BASE_PATH}contact`,
      data
    );
  }
}
