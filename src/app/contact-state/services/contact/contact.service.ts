import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../../models/contact-form';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private httpClient: HttpClient) {}

  placeQuery(data: ContactForm): Observable<ContactForm> {
    return this.httpClient.post<ContactForm>(
      `${environment.BASE_PATH}contact`,
      data
    );
  }
}
