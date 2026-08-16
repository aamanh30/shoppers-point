import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@shoppers-point/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  readonly #http: HttpClient = inject(HttpClient);

  fetchCountries(): Observable<Country[]> {
    return this.#http.get<Country[]>(
      `${environment.BASE_PATH}countries/countries.json`
    );
  }
}
