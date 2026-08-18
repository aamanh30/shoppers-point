import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@shoppers-point/environment';
import { Product } from '../../../../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class CatalogueService {
  readonly #http: HttpClient = inject(HttpClient);

  fetchProducts(): Observable<Product[]> {
    return this.#http.get<Product[]>(`${environment.BASE_PATH}products.json`);
  }

  fetchProductDetails(id: string): Observable<Product | undefined> {
    return this.fetchProducts().pipe(
      map(products => products.find(product => product.id.toString() === id))
    );
  }

  fetchCategories(): Observable<string[]> {
    return this.#http.get<string[]>(
      `${environment.BASE_PATH}products/categories.json`
    );
  }
}
