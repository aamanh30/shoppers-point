import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartAction } from '../models/cart-action.enum';
import { CartProduct } from '../models/cart-product';
import { CART_FEATURE_KEY } from './index';

export const {
  fetchCart,
  fetchCartSuccess,
  fetchError,
  updateCart,
  updateCartSuccess,
  updateProductQuantity,
  updateWishlist,
  updateWishlistSuccess,
  removeProduct,
  setCartAndWishlist,
} = createActionGroup({
  source: CART_FEATURE_KEY,
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
    removeProduct: props<{ id: number }>(),
    setCartAndWishlist: props<{
      products: CartProduct[];
      wishlist: number[];
    }>(),
  },
});
