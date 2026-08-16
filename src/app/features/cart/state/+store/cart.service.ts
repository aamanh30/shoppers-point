import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { environment } from '@shoppers-point/environment';
import { CartProduct } from '../models/cart-product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly #http: HttpClient = inject(HttpClient);

  fetchCart(userId: number | string): Observable<Cart> {
    return this.#http.get<Cart>(`${environment.BASE_PATH}carts/user/${userId}`);
  }

  updateCart(
    userId: number,
    cartId: number,
    products: CartProduct[]
  ): Observable<Cart> {
    return this.#http.patch<Cart>(`${environment.BASE_PATH}carts/${cartId}`, {
      userId,
      date: new Date().toISOString().substring(0, 10),
      products,
    });
  }

  deleteCart(cartId: number): Observable<Cart> {
    return this.#http.delete<Cart>(`${environment.BASE_PATH}carts/${cartId}`);
  }
}
