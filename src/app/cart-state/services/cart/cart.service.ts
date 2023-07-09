import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../../cart-state/models/cart';
import { environment } from '../../../../environments/environment';
import { CartProduct } from '../../models/cart-product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  fetchCart(userId: number | string): Observable<Cart> {
    return this.httpClient.get<Cart>(
      `${environment.BASE_PATH}carts/user/${userId}`
    );
  }

  updateCart(
    userId: number,
    cartId: number,
    products: CartProduct[]
  ): Observable<Cart> {
    return this.httpClient.patch<Cart>(
      `${environment.BASE_PATH}carts/${cartId}`,
      {
        userId,
        date: new Date().toISOString().substring(0, 10),
        products
      }
    );
  }

  deleteCart(cartId: number): Observable<Cart> {
    return this.httpClient.delete<Cart>(
      `${environment.BASE_PATH}carts/${cartId}`
    );
  }
}
