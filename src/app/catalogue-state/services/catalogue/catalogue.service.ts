import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../../../shared/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${environment.BASE_PATH}products.json`
    );
  }

  fetchProductDetails(id: string): Observable<Product | undefined> {
    return this.fetchProducts().pipe(
      map(products => products.find(product => product.id.toString() === id))
    );
  }

  fetchCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.BASE_PATH}products/categories.json`
    );
  }
}
