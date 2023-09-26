import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    fetchCart: emptyProps(),
    fetchCartSuccess: props<{ id: number; products: CartProduct[] }>(),
    fetchError: props<{ error: Partial<Error> }>(),
    updateCart: props<{
      productId: number;
      action: CartAction;
      quantity: number;
    }>(),
    updateCartSuccess: props<{ products: CartProduct[] }>(),
    updateProductQuantity: props<CartProduct>(),
    updateWishlist: props<{ productId: number }>(),
    updateWishlistSuccess: props<{ wishlist: number[] }>(),
    removeProduct: props<{ id: number }>()
  }
});
