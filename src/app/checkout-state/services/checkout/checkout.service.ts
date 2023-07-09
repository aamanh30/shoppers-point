import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Country } from '../../models/country';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  constructor(private httpClient: HttpClient) {}

  fetchCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(
      `${environment.BASE_PATH}countries/countries.json`
    );
  }
}
