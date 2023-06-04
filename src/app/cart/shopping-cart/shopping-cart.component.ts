import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Cart, CartProduct } from '../models';
import { Store } from '@ngrx/store';
import { CartActions, CartFeature, CartSelectors } from '../store';

@Component({
  selector: 'shoppers-point-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<CartProduct[]> = EMPTY;
  constructor(private store: Store<CartFeature.CartPartialState>) {}

  ngOnInit(): void {
    this.products$ = this.store.select(CartSelectors.products);
    this.store.dispatch(CartActions.fetchCart());
  }
}
