import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.BASE_PATH}products`);
  }

  fetchProductDetails(id: number | string): Observable<Product> {
    return this.httpClient.get<Product>(
      `${environment.BASE_PATH}products/${id}`
    );
  }

  fetchCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${environment.BASE_PATH}products/categories`
    );
  }
}
